export const environment = {
  production: true,
  username: '', //not assign, program will store username when token valid.
  appCode: 'DOCUCLAIM', //application code is a projt id, register on ups system.
  appName: 'DocuClaim', //short app name to display on nav bar
  tokenSessionId: '711CE777-5C8Cs-4F81-83F1-BB5D350320EA', //Id is a key reference on sessionStorage
  refreshTokenSessionId: '39C546A9E-54DD-41FD-B6BA-3C74B0CE5334', //Id is a key reference on sessionStorage
  userSessionId: '0AA2FF98-1619-4BF9-BFEC-FC717845E7FA', //Id is a key reference on sessionStorage
  token_type: 'bearer', // "Custom" : custom token, bearer : "oauth" token
  token: '', //not assign, program will store username when token valid.
  refresh_token: '', //not assign, program will store username when token valid.
  appDescription: '',
  appVersion: '0.0.0.1',
  appRegion: 'PROD', //UAT : Test, PROD : Production

  system_id: '4FFC7EE5-F687-439D-BBF3-2AEC5686FE23', //system id is registered on ups system.
  client_id: '52308E1D-51EA-4064-8956-E14BF113069C', //static value for user profile source.

  apiuseroauth: 'https://centerapi.philliplife.com/apigw/user.oauth.api/', //api for oauth
  apiauthen: 'https://centerapi.philliplife.com/apigw/securityapi/api/authen/', //api for custom auth
  apilookup: 'https://centerapi.philliplife.com/apigw/lookupapi/api/lookup/',
  apiclaim: 'https://centerapi.philliplife.com/apigw/docuclaim.api/api/claim/',
  apiclaimreport: 'https://centerapi.philliplife.com/apigw/ClaimApi/api/report/',
  apiReport: 'https://centerapi.philliplife.com/apigw/docuclaim.api/api/',
  //menuesValidated = เพื่อให้ระบบทำการ flag เป็น true เมื่อ login ผ่านแล้ว และมีการตรวจสอบสิทธิของเมนูแล้ว **กรณีกดปุ่ม refresh จะกลับมาเป็น false ใน AuthGuard จะทำการตรวจสอบ menu ใหม่
  menuesValidated: false,
  menues: [
    {
      tasks_id: 'home',
      name: 'Claim doc.',
      url: '#',
      glyphicon: 'fa fa-university',
      visible: true,
      submenues: [
        {
          tasks_id: 'claimedit',
          name: 'Edit / submit doc.',
          url: '/home/claim/edit',
          glyphicon: 'fa fa-upload',
          visible: true,
        },
        {
          tasks_id: 'claiminq',
          name: 'Inquiry doc.',
          url: '/home/claim/iquiry',
          glyphicon: 'fa fa-search',
          visible: true,
        },
      ],
    },
    {
      tasks_id: 'home',
      name: 'Report.',
      url: '#',
      glyphicon: 'fa fa-file',
      visible: true,
      submenues: [
        {
          tasks_id: 'reportStatus',
          name: 'รายงานสถานะเอกสาร',
          url: '/home/report',
          glyphicon: 'fa fa-file',
          visible: true,
        },
      ],
    },
  ],
};
