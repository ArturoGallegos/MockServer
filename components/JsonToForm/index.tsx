import * as yup from 'yup';
import { Button, CircularProgress, Grid, Tab, Tabs } from '@material-ui/core';
import classNames from 'classnames';
import { isEqual, isFunction, keys } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormContext } from './FormContext';
import GridFields from './GridFields';
import ActionBtn from './Inputs/ActionBtn';
import { Component } from './JsonToForm';
import Actions from './Layout/Actions';
import Panel from './Layout/Panel';
import Sector from './Layout/Sector';
import { yupResolver } from '@hookform/resolvers/yup';

const JsonToForm: React.FC<Component> = ({ onChange, jsonData, id, className, variant = 'format-1', loading, onSubmit, defaultData, autofill, resolver }: Component) => {
  const [currentTab, setCurrentTab] = useState(0);
  const currentFormData = useRef(defaultData);
  const fieldNames = keys(currentFormData.current).reduce((acc, key) => {
    acc[key] = key;
    return acc;
  }, {});

  const {
    register,
    unregister,
    reset,
    setValue,
    setError,
    watch,
    trigger,
    control,
    formState: { errors, isDirty, dirtyFields },
  } = useForm({
    defaultValues: defaultData,
    resolver: !resolver ? null : yupResolver(yup.object().shape(resolver(fieldNames))),
  });

  const watchingData = watch();

  useEffect(() => {
    if (defaultData) {
      reset(defaultData);
    }
  }, [defaultData]);

  const handleChange = (tab: number) => setCurrentTab(tab);

  const handleOnSubmit = async(event) => {
    event.preventDefault();
    event.stopPropagation();
    await trigger();
    if(Object.keys(errors).length > 0) return;
    onSubmit(watchingData);
    reset(watchingData);
    return;
  };

  useEffect(() => {
    if (!isFunction(onChange)) return;

    if (!isEqual(watchingData, currentFormData.current)) {
      currentFormData.current = watchingData;
      onChange(watchingData);
    }
  }, [watchingData]);

  return (
    <FormContext.Provider
      value={{
        fields: watchingData,
        errors,
        setError,
        setValue,
        trigger,
        register,
        dirtyFields,
        control,
        loading,
        unregister
      }}>
      <form id={id} className={classNames('json-to-form', 'json-to-form--' + variant, className)} onSubmit={handleOnSubmit} autoComplete='no'>
        {!autofill && (
          <>
            <input type='password' className='fake-password-hidden' />
            <input type='text' className='fake-password-hidden' />
          </>
        )}
        {!!jsonData.tabs && (
          <Grid container spacing={3}>
            <Grid container spacing={0}>
              <Grid md={3} className='tabs-container' item>
                {jsonData.tabsHeader}
                <Tabs value={currentTab} onChange={(_, tab) => handleChange(tab)} orientation='vertical'>
                  {jsonData.tabs.map((tab, index) => (
                    <Tab key={index} className='item-tab' label={tab.title} icon={tab.icon} disabled={tab.disabled} />
                  ))}
                </Tabs>
                {jsonData.tabsFooter}
              </Grid>
              <Grid md={9} item style={{ position: 'relative' }}>
              {!!loading && <div className='loading-progress'><CircularProgress /></div>}
                {jsonData.tabs.map((tab, tabIndex) => (
                  <Panel key={tabIndex} index={tabIndex} tab={currentTab}>
                    <div className={`fields-list${tab.actions ? ' with-actions' : ''}`}>
                      {tab.fields && <GridFields fields={tab.fields} defaultData={defaultData} />}
                      {tab.sectors &&
                        tab.sectors.map((sector, sectorIndex) => (
                          <Sector key={sectorIndex} title={sector.title}>
                            <GridFields fields={sector.fields} defaultData={defaultData} />
                          </Sector>
                        ))}
                    </div>

                    {tab.actions && (
                      <Actions>
                        {tab.actions.map((action, actionIndex) => (
                          <ActionBtn {...action} key={actionIndex} />
                        ))}
                      </Actions>
                    )}
                  </Panel>
                ))}
              </Grid>
            </Grid>
          </Grid>
        )}

        {!!jsonData.fields && (
          <>
            <GridFields fields={jsonData.fields} loading={loading} />
            <Grid item md={12} className='submit-action'>
              <Button disabled={!isDirty || !!Object.keys(errors).length} type='submit' color='primary' variant='contained'>
                {loading ? <CircularProgress size={30} color='inherit' /> : jsonData.submitText || 'Send'}
              </Button>
            </Grid>
          </>
        )}
      </form>
    </FormContext.Provider>
  );
};

export default React.memo(JsonToForm);
