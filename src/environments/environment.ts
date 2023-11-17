// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ProductApi: 'http://localhost:5000/api/products', // Development API endpoint
  DiscussionApi: 'http://localhost:5000/api/Discussion', // Development API endpoint
  messageApi: 'http://localhost:5000/api/Message', // Development API endpoint
  loginApi: 'http://localhost:5000/api/Account/Login', // Development API endpoint

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
