import React from 'react';

const {Consumer, Provider} = React.createContext('light');

module.export = {
  ThemeConsumer: Consumer,
  ThemeProvider: Provider
};