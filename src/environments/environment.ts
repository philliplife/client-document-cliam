/*Configuration for DEVELOPMENT environment*/
export const environment = {
  production: false,
  username: '', //not assign, program will store username when token valid.
  appCode: 'DOCUCLAIM', //application code is a projt id, register on ups system.
  appName: 'DocuClaim', //short app name to display on nav bar
  tokenSessionId: '7D8291D7-36C1-44E8-B822-F7F4B75BCB3B', //Id is a key reference on sessionStorage
  refreshTokenSessionId: '9C546A9E-54DD-41FD-B6BA-3C74B0CE5334', //Id is a key reference on sessionStorage
  userSessionId: '0AA2FF98-1619-4BF9-BFEC-FC717845E7FA', //Id is a key reference on sessionStorage
  token_type: 'bearer', // "Custom" : custom token, bearer : "oauth" token
  token: '', //not assign, program will store username when token valid.
  refresh_token: '', //not assign, program will store username when token valid.
  appDescription: '',
  appVersion: '0.0.0.1',
  appRegion: 'UAT', //UAT : Test, PROD : Production

  system_id: '4FFC7EE5-F687-439D-BBF3-2AEC5686FE23', //system id is registered on ups system.
  client_id: '52308E1D-51EA-4064-8956-E14BF113069C', //static value for user profile source.

  apiuseroauth: 'https://centerapi.philliplife.com/apiproxy2/user.oauth.api/', //api for oauth
  apiauthen:
    'https://centerapi.philliplife.com/apiproxy2/securityapi/api/authen/', //api for custom auth
  apilookup:
    'https://centerapi.philliplife.com/apiproxy2/lookupapi/api/lookup/',
  apiclaim:
    'https://centerapi.philliplife.com/apiproxy2/docuclaim.api/api/claim/',
  apiclaimreport:
    'https://centerapi.philliplife.com/apiproxy2/ClaimApiDev/api/report/',

  //apiclaim:'http://localhost:55918/api/claim/',
  //apiclaimreport:'http://localhost:55817/api/report/',

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
          tasks_id: 'claimedit',
          name: 'รายงานสถานะเอกสาร',
          url: '/home/report',
          glyphicon: 'fa fa-file',
          visible: true,
        },
      ],
    },
    // {
    //     tasks_id: 'security',
    //     name: 'Security',
    //     url: '#',
    //     glyphicon: 'fa fa-lock',
    //     visible: true,
    //     submenues: [
    //         {
    //             tasks_id: 'group',
    //             name: 'Group',
    //             url: '/home/group',
    //             glyphicon: 'fa fa-group',
    //             visible: true
    //         }
    //     ]
    // },
    // {
    //     tasks_id: 'api',
    //     name: 'API',
    //     url: '#',
    //     glyphicon: 'fa fa-university',
    //     visible: true,
    //     submenues: [
    //         {
    //             tasks_id: 'system',
    //             name: 'System',
    //             url: '/home/system',
    //             glyphicon: 'fa fa-paper-plane',
    //             visible: true
    //         },
    //         {
    //             tasks_id: 'role',
    //             name: 'Role',
    //             url: '/home/role',
    //             glyphicon: 'fa fa-tasks',
    //             visible: true
    //         },
    //         {
    //             tasks_id: 'apiproject',
    //             name: 'APIProject',
    //             url: '/home/apiproject',
    //             glyphicon: 'fa fa-file-image-o',
    //             visible: true
    //         },
    // {
    //             tasks_id: 'apiaction',
    //             name: 'APIAction',
    //             url: '/home/apiaction',
    //             glyphicon: 'fa fa-file-image-o',
    //             visible: true
    //         },
    // {
    //             tasks_id: 'apipermission',
    //             name: 'APIPermission',
    //             url: '/home/apipermission',
    //             glyphicon: 'fa fa-file-image-o',
    //             visible: true
    //         },
    //     ]
    // },
    // {
    //     tasks_id: 'report',
    //     name: 'Report',
    //     url: '#',
    //     glyphicon: 'fa fa-print',
    //     visible: true,
    //     submenues: [
    //         {
    //             tasks_id: 'authenmatrix',
    //             name: 'Authenorization Matrix',
    //             url: '/home/report/authenmatrix',
    //             glyphicon: 'fa fa-calendar',
    //             visible: true
    //         },
    //         {
    //             tasks_id: 'userlog',
    //             name: 'User Log Report',
    //             url: '/home/report/userlog',
    //             glyphicon: 'fa fa-newspaper-o',
    //             visible: true
    //         }
    //     ]
    // },
  ],
};
