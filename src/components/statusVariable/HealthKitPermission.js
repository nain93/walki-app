import AppleHealthKit from 'react-native-health';

export const permissions = {
    permissions: {
      read: [
        AppleHealthKit.Constants.Permissions.Steps,
        AppleHealthKit.Constants.Permissions.StepCount,
      ],
      write: [AppleHealthKit.Constants.Permissions.Steps],
    },
  };