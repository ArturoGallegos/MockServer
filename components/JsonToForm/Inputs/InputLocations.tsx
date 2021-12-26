import { Checkbox, IconButton, MenuItem, Select, Menu } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { indexOf } from 'lodash';
import moment from 'moment';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from 'store';
import { userUpdateGroups } from 'store/actions/users';
import { userGroupsAdded } from '../../../../store/actions/users';
import { FormContext } from '../FormContext';

interface LocationsAddedInterface {
  location: Location;
}

interface Location {
  id: number;
  abbreviation: string;
  name: string;
  description: string;
  groups: Group[];
}

interface Group {
  id: number;
  name: string;
}

const InputLocations: React.FC = () => {
  const divRoles = useRef(null);
  const { fields } = useContext(FormContext)
  const { locations: { list: itemsLocations }, groups: { data: itemsGroups } } = useSelector<RootStore>(state => state) as RootStore;

  const [locations, setLocations] = useState<number[]>([])
  const [roles, setRoles] = useState<number[]>([])
  const [locationsAdded, setLocationsAdded] = useState([])
  const [edit, setEdit] = useState<number>(null)
  const [loader, setLoader] = useState<boolean>(false)

  const updateLocationsAdded = (groups) => {
    const locationsAddedIds = groups.map(item => item.location.id);
    const emptyLocations = itemsLocations.map(item => {
      const check = locationsAddedIds.indexOf(item.id) > -1;
      return check ? false : {
        location: {
          "id": item.id,
          "abbreviation": item.abbreviation,
          "name": item.name,
          "description": item.description,
          "groups": []
        }
      }
    }).filter(item => item !== false);
    setLocationsAdded([...groups, ...new Set(emptyLocations)])
  }

  useEffect(() => {
    (async () => {
      const groups = await userGroupsAdded(fields.id);
      updateLocationsAdded(groups)
    })()
  }, [])

  const handleChangeOptions = (type, event) => {
    const values = event.target.value;
    if (type === 'locations') {
      setLocations(values)
    } else {
      setRoles(values)
    }
  }

  const handleRemoveLocation = async (location_id) => {
    const removeGroups = locationsAdded.find(item => item.location.id === location_id).location.groups;
    const removeGroupsIds = removeGroups.map(item => item.id);
    const data = [{
      location_id,
      remove: removeGroupsIds,
      roles: []
    }]

    const groups = await userUpdateGroups(fields.id, data);
    updateLocationsAdded(groups)
  }

  const handleOpenRoles = (edit) => {
    const roles = locationsAdded.find(item => item.location.id === edit).location.groups;
    const rolesIds = roles.map(item => item.id) as number[];
    setRoles([...new Set(rolesIds)])
    setEdit(edit)
  }

  const handleCloseRoleSelect = async () => {

    if (!roles.length) {
      handleRemoveLocation(edit)
      setRoles([])
      setEdit(null);
      return;
    };

    const oldRoles = locationsAdded.find(item => item.location.id === edit).location.groups;
    const currentRoles = oldRoles.map(item => item.id);
    const remove = currentRoles.filter(role => roles.indexOf(role) === -1);
    const addRoles = roles.filter(item => currentRoles.indexOf(item) === -1);

    if (!addRoles.length && !remove.length) {
      setRoles([])
      setEdit(null);
    }

    const data = {
      location_id: edit,
      roles: addRoles,
      remove
    }

    const groups = await userUpdateGroups(fields.id, [data]);
    updateLocationsAdded(groups)

    setRoles([])
    setEdit(null);
  }

  const locationGroups = () => {
    const thisLocation = locationsAdded.find(item => item.location.id === edit);
    if (!thisLocation) return itemsGroups;

    const groups = thisLocation.location.groups;

    return itemsGroups.map(item => {
      const thisGroup = groups.find(group => group.id === item.id);
      if (thisGroup) {
        return { ...item, create_dt: thisGroup.create_dt }
      }
      return item;
    });
  }

  const saveRole = (role) => {
    const newRoles = [...roles]
    const index = newRoles.indexOf(role.id);
    if(index > -1) {
      newRoles.splice(index, 1);
    } else {
      newRoles.push(role.id);
    }
    setRoles(newRoles);
  }


  return (<div className="input-locations">

    <table className="input-locations__roles-table">
      <thead>
        <tr>
          <th>Location</th>
          <th>Roles</th>
          <th className="actions"></th>
        </tr>
      </thead>
      <tbody>
        {locationsAdded.map(({ location }, locationIndex) => <tr key={locationIndex}>
          <td className="input-locations__location">
            {location.description}</td>
          <td className="input-locations__roles">
            <div>
              {location.groups.map((role, roleIndex) => <span key={roleIndex}>{role.name}</span>)}
            </div>
          </td>
          <td className="actions">
            <div ref={divRoles}>
              {!edit && <IconButton onClick={() => handleOpenRoles(location.id)}><EditIcon /></IconButton>}
              {edit === location.id && <div className="location-roles">
                <Menu open anchorEl={divRoles.current} onClose={handleCloseRoleSelect}>
                  {itemsGroups && locationGroups().map((item: { id: number, name: string, create_dt: string }, itemIndex) => {
                    return <MenuItem onClick={() => saveRole(item)} key={itemIndex} className="select-item">
                      <Checkbox checked={(roles.indexOf(item.id) > - 1)} />
                      {item.name}
                      {item.create_dt && <span className="date">{moment(item.create_dt).format('MM/DD/YYYY')}</span>}
                    </MenuItem>
                  })}
                </Menu>
              </div>}
            </div>
          </td>
        </tr>)}
      </tbody>
    </table>
  </div>);
};

export default InputLocations;