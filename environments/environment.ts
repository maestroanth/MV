// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: true,
    baseAPIUrl: 'https://sageofthemultiverse.com/public/',//to use passport it's not under /api anymore
    tokenURL: 'https://sageofthemultiverse.com/public/oauth/token',
    grantType: 'client_credentials',
    appID: 71,
    appSecret: 'bHFAwcSejLJXTplv05R1MnUUY9RUBa2TcsxjAj54',
    scope: '*',

    //for sage creation page. Since I'm too lazy currently to query the API for id's to have this dynamic, just remember to update these values whenever I add or delete a race from the DB.
    minRaceID: 1001,
    maxRaceID: 1010,
    baseImagePath: 'assets/images/',
    maxImagesPerRace: 3,
    profileImageExtension: '.jpg',

};
