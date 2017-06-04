'use strict';

PassFF.Preferences = (function() {
  var preferences;

  let loadPreferences = function() {
    preferences = {
      passwordInputNames    : 'passwd,password,pass',
      loginInputNames       : 'login,user,mail,email,username,opt_login,log,usr_name',
      loginFieldNames       : 'login,user,username,id',
      passwordFieldNames    : 'passwd,password,pass',
      urlFieldNames         : 'url,http',
      command               : '/usr/bin/pass',
      commandArgs           : '',
      shell                 : '/bin/bash',
      shellArgs             : '',
      home                  : '',
      gnupgHome             : '',
      storeDir              : '',
      storeGit              : '',
      gpgAgentInfo          : '.gpg-agent-info',
      autoFill              : false,
      autoSubmit            : false,
      shortcutKey           : 'y',
      shortcutMod           : 'control',
      subpageSearchDepth    : 5,
      callType              : 'direct',
      caseInsensitiveSearch : true,
      enterBehavior         : 0,
      defaultPasswordLength : 16,
      defaultIncludeSymbols : true,
      preferInsert          : false,
    };

    switch (browser.runtime.PlatformOs) {
      case 'mac':
        Object.assign(preferences, {
          command   : '/usr/local/bin/pass',
          shellArgs : '--login',
          callType  : 'shell',
        });
        break;
    }

    return browser.storage.local.get(Object.keys(preferences))
      .then((overrides) => {
        Object.assign(preferences, overrides);
        log.debug("Loaded preferences:", preferences);
      });
  };

  return {
    load: loadPreferences,
    get: function(preference) {
      if (preferences.hasOwnProperty(preference)) {
        return preferences[preference];
      } else {
        throw `No such preference: ${preference}`;
      }
    },
  };
})();