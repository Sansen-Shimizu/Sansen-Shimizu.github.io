const _0x3b29f9=_0x4f48;(function(_0x321cce,_0x5e8210){const _0x1d6183=_0x4f48,_0x5998fe=_0x321cce();while(!![]){try{const _0x1db51b=parseInt(_0x1d6183(0x12f))/0x1*(parseInt(_0x1d6183(0x195))/0x2)+-parseInt(_0x1d6183(0x120))/0x3*(-parseInt(_0x1d6183(0x191))/0x4)+-parseInt(_0x1d6183(0x15b))/0x5*(parseInt(_0x1d6183(0x12a))/0x6)+-parseInt(_0x1d6183(0x167))/0x7*(parseInt(_0x1d6183(0x10b))/0x8)+-parseInt(_0x1d6183(0x175))/0x9*(-parseInt(_0x1d6183(0xff))/0xa)+-parseInt(_0x1d6183(0x128))/0xb*(parseInt(_0x1d6183(0x139))/0xc)+parseInt(_0x1d6183(0x15a))/0xd;if(_0x1db51b===_0x5e8210)break;else _0x5998fe['push'](_0x5998fe['shift']());}catch(_0x3a7a12){_0x5998fe['push'](_0x5998fe['shift']());}}}(_0x46e8,0x7044a));import*as _0x2858cb from'https://sansen-shimizu.github.io/three.module.js';import{GUI}from'https://sansen-shimizu.github.io/dat.gui.module.js';let scene,renderer,camera,stats,textureLoader,sleeveVector1,sleeveVector2,sleeveVector3,tmpParticle,model,skeleton,mixer,clock;const crossFadeControls=[];let idleAction,walkAction,runAction,RPSDamn,RPSHopping,RPSYay,RPSPunch,RPSShocked,waveAction,lastAction,idleWeight,walkWeight,runWeight,damnWeight,hoppingWeight,yayWeight,punchWeight,shockedWeight,waveWeight,actions,settings,RPSbutton,RPSbutton2,RPSbutton3,RPSbutton4,triggerState={'punchingOn':![],'happyOn':![],'surpriseOn':![],'defeatedOn':![],'rock':![],'paper':![],'scissors':![]};const animationEnum={'idleAction':0x1,'walkAction':0x2,'runAction':0x3,'RPSDamn':0x4,'RPSHopping':0x5,'RPSYay':0x6,'RPSPunch':0x7,'RPSShocked':0x8,'waveAction':0x9};Object[_0x3b29f9(0x126)](animationEnum);const container=document[_0x3b29f9(0x10f)]('3jsme'),backupImage=document[_0x3b29f9(0x10f)](_0x3b29f9(0x19b));function RPSButtonsOn(){const _0x415d3d=_0x3b29f9;container['removeChild'](RPSbutton),container['appendChild'](RPSbutton2),container[_0x415d3d(0x13d)](RPSbutton3),container[_0x415d3d(0x13d)](RPSbutton4);}function RPSButtonsOff(){const _0x200cad=_0x3b29f9;container[_0x200cad(0x146)](RPSbutton),container[_0x200cad(0x146)](RPSbutton2),container['removeChild'](RPSbutton3),container['removeChild'](RPSbutton4);}function StartButtonOn(){const _0x1c8d6c=_0x3b29f9;container[_0x1c8d6c(0x13d)](RPSbutton),container[_0x1c8d6c(0x146)](RPSbutton2),container['removeChild'](RPSbutton3),container['removeChild'](RPSbutton4);}function _0x4f48(_0x224da2,_0x30a538){const _0x46e8bf=_0x46e8();return _0x4f48=function(_0x4f48ad,_0x5ea048){_0x4f48ad=_0x4f48ad-0xfd;let _0x479a28=_0x46e8bf[_0x4f48ad];return _0x479a28;},_0x4f48(_0x224da2,_0x30a538);}let singleStepMode=![],sizeOfNextStep=0x0;function disableRPS(){const _0x286ebe=_0x3b29f9;let _0x3dfb5e=body['getElementById'](_0x286ebe(0x100));_0x3dfb5e['style'][_0x286ebe(0x19d)]();}const DAMPING=0.03,DRAG=0x1-DAMPING,MASS=0.01,restDistance=0.2,xSegs=0x4,ySegs=0x4,clothFunction=plane(restDistance*xSegs,restDistance*ySegs),GRAVITY=0x3d5*0.02,gravity=new _0x2858cb[(_0x3b29f9(0x152))](0x0,-GRAVITY,0x0)[_0x3b29f9(0x135)](MASS),TIMESTEP=0x12/0x3e8,TIMESTEP_SQ=TIMESTEP*TIMESTEP;let pins=[];function _0x46e8(){const _0x1bdf01=['Activation/Deactivation','happyOn','setEnabled','createElement','computeVertexNormals','anisotropy','style','top','forEach','needsUpdate','onChange','classList1','addFolder','modify\x20time\x20scale','updateProjectionMatrix','68FUknxh','tmp','camera','make\x20single\x20step','6274iukSRB','left','RPS3','RPS.oiwai','loop','particles','3jsout','load','setProperty','stop','outputEncoding','modify\x20hoppingWeight\x20weight','modify\x20punchWeight\x20weight','defeatedOn','sub','lerpVectors','castShadow','previous','isMesh','paper','RPS.ahhdamn','display','enabled','WebGLRenderer','TextureLoader','listen','RPS2','https://uploads-ssl.webflow.com/6152c4ba477fccf758106a16/6156b85744b257a5fa9b9795_sansensleeve.png','animations','GLTFLoader','7599440EGpOCw','awef','relative','getEffectiveWeight','RPS.punch','punchingOn','removeEventListener','classList2','getDelta','clientHeight','action','bones','8zfmFAQ','name','far','Blend\x20Weights','getElementById','clipAction','DoubleSide','setAttribute','open','scene','aspect','previousElementSibling','play','Visibility','rotation','from\x20idle\x20to\x20walk','alt','modify\x20RPSShocked\x20weight','https://cdn.jsdelivr.net/npm/three@0.133.1/examples/js/libs/draco/','surpriseOn','time','105018XjtXMY','setDisabled','copy','https://uploads-ssl.webflow.com/6152c4ba477fccf758106a16/616cc4e737a2ff660e32dfb9_sansenchanNLAfixed.glb.txt','getWorldPosition','tmp2','freeze','modify\x20RPSDamn\x20weight','39149NezAQh','from\x20run\x20to\x20walk','437190FxBgeu','position','background-image:\x20url(\x22https://uploads-ssl.webflow.com/6152c4ba477fccf758106a16/61710c0923fa41a322562b33_paper4.svg\x22);\x20background-size:\x20cover;\x20z-index:9999999;\x20font-size:\x2018px;\x20border-radius:\x20100%;\x20width:\x2080px;\x20height:\x2080px;\x20position:\x20absolute;\x20right:\x20-10px;\x20bottom:\x20130px','General\x20Speed','setDecoderPath','281NAWqfH','modify\x20shockedWeight\x20weight','HemisphereLight','set\x20custom\x20duration','addForce','MeshDepthMaterial','multiplyScalar','visible','setDRACOLoader','PerspectiveCamera','2976sGIBhC','click','RPS1','integrate','appendChild','no-pointer-events','scissors','index','Clock','length','rock','button','constraints','removeChild','domElement','setEffectiveTimeScale','parentElement','modify\x20step\x20size','remove','_clip','update','addEventListener','modify\x20yayWeight\x20weight','clientWidth','deactivate\x20all','Vector3','background-image:\x20url(\x22https://uploads-ssl.webflow.com/6152c4ba477fccf758106a16/61710c0934ee97516696535f_scissors4.svg\x22);\x20background-size:\x20cover;\x20z-index:9999999;\x20font-size:\x2018px;\x20border-radius:\x20100%;\x20width:\x2080px;\x20height:\x2080px;\x20position:\x20absolute;\x20right:\x2027px;\x20bottom:\x2039px','pause/continue','finished','modify\x20run\x20weight','Scene','original','チョキ','3240380imBecd','60hUfFUE','invMass','customDepthMaterial','modify\x20waveAction\x20weight','setClearColor','paused','modify\x20idle\x20weight','control-disabled','resize','from\x20walk\x20to\x20run','render','modify\x20RPSPunch\x20weight','1882587eVfgrR','devicePixelRatio','Mesh','RPS4','crossFadeTo','attributes','set','shadow','background-image:\x20url(\x22https://uploads-ssl.webflow.com/6152c4ba477fccf758106a16/617114b37689be616b03e62c_play.svg\x22);\x20background-size:\x20cover;z-index:9999999;\x20font-size:\x2025px;\x20border-radius:\x20100%;\x20width:\x20100px;\x20height:\x20100px;\x20position:\x20absolute;\x20right:\x200px;\x20bottom:\x200px','modify\x20walk\x20weight','timeScale','activate\x20all','subVectors','classList','9REIWzR','use\x20default\x20duration','Crossfading','none','modify\x20damnWeight\x20weight','modify\x20waveWeight\x20weight','setXYZ','add','sRGBEncoding','push','ParametricGeometry','DRACOLoader','setEffectiveWeight'];_0x46e8=function(){return _0x1bdf01;};return _0x46e8();}const tmpForce=new _0x2858cb[(_0x3b29f9(0x152))](),diff=new _0x2858cb[(_0x3b29f9(0x152))]();class Particle{constructor(_0x1b07e9,_0x2ac362,_0x434963,_0x158fdb){const _0x3fe765=_0x3b29f9;this[_0x3fe765(0x12b)]=new _0x2858cb[(_0x3fe765(0x152))](),this[_0x3fe765(0x1a6)]=new _0x2858cb[(_0x3fe765(0x152))](),this[_0x3fe765(0x158)]=new _0x2858cb[(_0x3fe765(0x152))](),this['a']=new _0x2858cb[(_0x3fe765(0x152))](0x0,0x0,0x0),this['mass']=_0x158fdb,this[_0x3fe765(0x15c)]=0x1/_0x158fdb,this['tmp']=new _0x2858cb[(_0x3fe765(0x152))](),this[_0x3fe765(0x125)]=new _0x2858cb['Vector3'](),clothFunction(_0x1b07e9,_0x2ac362,this[_0x3fe765(0x12b)]),clothFunction(_0x1b07e9,_0x2ac362,this[_0x3fe765(0x1a6)]),clothFunction(_0x1b07e9,_0x2ac362,this[_0x3fe765(0x158)]);}[_0x3b29f9(0x133)](_0x58ae88){const _0x321089=_0x3b29f9;this['a']['add'](this[_0x321089(0x125)][_0x321089(0x122)](_0x58ae88)[_0x321089(0x135)](this[_0x321089(0x15c)]));}[_0x3b29f9(0x13c)](_0x3892c0){const _0x12c5f4=_0x3b29f9,_0x3f9b73=this[_0x12c5f4(0x192)][_0x12c5f4(0x173)](this[_0x12c5f4(0x12b)],this[_0x12c5f4(0x1a6)]);_0x3f9b73[_0x12c5f4(0x135)](DRAG)[_0x12c5f4(0x17c)](this[_0x12c5f4(0x12b)]),_0x3f9b73[_0x12c5f4(0x17c)](this['a'][_0x12c5f4(0x135)](_0x3892c0)),this[_0x12c5f4(0x192)]=this[_0x12c5f4(0x1a6)],this['previous']=this[_0x12c5f4(0x12b)],this[_0x12c5f4(0x12b)]=_0x3f9b73,this['a'][_0x12c5f4(0x16d)](0x0,0x0,0x0);}}class Cloth{constructor(_0x5c5833=0xa,_0x209770=0xa,_0x1121c0=0x0,_0x4a4e65=0x0,_0x12e6e3=0x0){const _0x1e0ff9=_0x3b29f9;this['w']=_0x5c5833,this['h']=_0x209770;const _0x497a7a=[],_0x1efe9a=[];for(let _0x4b342c=0x0;_0x4b342c<=_0x209770;_0x4b342c++){for(let _0x53a60f=0x0;_0x53a60f<=_0x5c5833;_0x53a60f++){_0x497a7a[_0x1e0ff9(0x17e)](new Particle(_0x53a60f/_0x5c5833+_0x1121c0,_0x4b342c/_0x209770+_0x4a4e65,0x0+_0x12e6e3,MASS));}}for(let _0x2ca9bf=0x0;_0x2ca9bf<_0x209770;_0x2ca9bf++){for(let _0x434125=0x0;_0x434125<_0x5c5833;_0x434125++){_0x1efe9a[_0x1e0ff9(0x17e)]([_0x497a7a[_0x2aadf8(_0x434125,_0x2ca9bf)],_0x497a7a[_0x2aadf8(_0x434125,_0x2ca9bf+0x1)],restDistance]),_0x1efe9a[_0x1e0ff9(0x17e)]([_0x497a7a[_0x2aadf8(_0x434125,_0x2ca9bf)],_0x497a7a[_0x2aadf8(_0x434125+0x1,_0x2ca9bf)],restDistance]);}}for(let _0x31b33c=_0x5c5833,_0x1859d9=0x0;_0x1859d9<_0x209770;_0x1859d9++){_0x1efe9a['push']([_0x497a7a[_0x2aadf8(_0x31b33c,_0x1859d9)],_0x497a7a[_0x2aadf8(_0x31b33c,_0x1859d9+0x1)],restDistance]);}for(let _0x449462=_0x209770,_0x2f0303=0x0;_0x2f0303<_0x5c5833;_0x2f0303++){_0x1efe9a[_0x1e0ff9(0x17e)]([_0x497a7a[_0x2aadf8(_0x2f0303,_0x449462)],_0x497a7a[_0x2aadf8(_0x2f0303+0x1,_0x449462)],restDistance]);}this[_0x1e0ff9(0x19a)]=_0x497a7a,this['constraints']=_0x1efe9a;function _0x2aadf8(_0x4a54ad,_0x2be459){return _0x4a54ad+_0x2be459*(_0x5c5833+0x1);}this[_0x1e0ff9(0x140)]=_0x2aadf8;}}function plane(_0x1030d7,_0x31b57e){return function(_0x46bcc0,_0x20bac3,_0x175bb0){const _0x4422f9=(_0x46bcc0-0.5)*_0x1030d7,_0x58bc9c=(_0x20bac3+0.5)*_0x31b57e,_0x239f89=0x0;_0x175bb0['set'](_0x4422f9,_0x58bc9c,_0x239f89);};}function satisfyConstraints(_0x1ca44a,_0x33c959,_0x159272){const _0x34e9e1=_0x3b29f9;diff[_0x34e9e1(0x173)](_0x33c959[_0x34e9e1(0x12b)],_0x1ca44a[_0x34e9e1(0x12b)]);const _0x431c3b=diff[_0x34e9e1(0x142)]();if(_0x431c3b===0x0)return;const _0x4a24fd=diff[_0x34e9e1(0x135)](0x1-_0x159272/_0x431c3b),_0x1f028a=_0x4a24fd['multiplyScalar'](0.5);_0x1ca44a[_0x34e9e1(0x12b)]['add'](_0x1f028a),_0x33c959[_0x34e9e1(0x12b)][_0x34e9e1(0x1a3)](_0x1f028a);}function updateCloth(_0x221ecf){_updateLeftCloth(),_updateRightCloth2();}function _updateLeftCloth(){const _0x1157ef=_0x3b29f9,_0x584fad=cloth[_0x1157ef(0x19a)];for(let _0x3c9a6e=0x0,_0x1d9c6c=_0x584fad[_0x1157ef(0x142)];_0x3c9a6e<_0x1d9c6c;_0x3c9a6e++){const _0x1f2064=_0x584fad[_0x3c9a6e];_0x1f2064[_0x1157ef(0x133)](gravity),_0x1f2064['integrate'](TIMESTEP_SQ);}const _0x3ab03e=cloth['constraints'],_0xeab6cc=_0x3ab03e['length'];for(let _0xe8d402=0x0;_0xe8d402<_0xeab6cc;_0xe8d402++){const _0x146ff2=_0x3ab03e[_0xe8d402];satisfyConstraints(_0x146ff2[0x0],_0x146ff2[0x1],_0x146ff2[0x2]);}for(let _0x201c54=0x0,_0x4318c1=_0x584fad['length'];_0x201c54<_0x4318c1;_0x201c54++){const _0x4d0abf=_0x584fad[_0x201c54],_0x5cfaca=_0x4d0abf[_0x1157ef(0x12b)];_0x5cfaca['y']<-0x0&&(_0x5cfaca['y']=-0x0);}_leftPins(_0x584fad);}function _leftPins(_0x14df7a){const _0x44fc5a=_0x3b29f9;if(skeleton!=null){sleeveVector1=new _0x2858cb[(_0x44fc5a(0x152))](),sleeveVector2=new _0x2858cb['Vector3']();var _0x389377,_0x3853d0,_0x577513;_0x389377=0x10,_0x3853d0=0xe,_0x577513=0xc,tmpParticle=_0x14df7a[0x4],sleeveVector1=new _0x2858cb[(_0x44fc5a(0x152))](),skeleton[_0x44fc5a(0x10a)][_0x389377]['getWorldPosition'](sleeveVector1),tmpParticle['original'][_0x44fc5a(0x122)](sleeveVector1),tmpParticle=_0x14df7a[0x3],sleeveVector1=new _0x2858cb[(_0x44fc5a(0x152))](),sleeveVector2=new _0x2858cb['Vector3'](),skeleton[_0x44fc5a(0x10a)][_0x389377][_0x44fc5a(0x124)](sleeveVector1),skeleton['bones'][_0x3853d0][_0x44fc5a(0x124)](sleeveVector2),sleeveVector3=new _0x2858cb[(_0x44fc5a(0x152))](),sleeveVector3['lerpVectors'](sleeveVector1,sleeveVector2,0.5),tmpParticle[_0x44fc5a(0x158)]['copy'](sleeveVector3),tmpParticle=_0x14df7a[0x2],sleeveVector1=new _0x2858cb[(_0x44fc5a(0x152))](),skeleton['bones'][_0x3853d0]['getWorldPosition'](sleeveVector1),tmpParticle[_0x44fc5a(0x158)][_0x44fc5a(0x122)](sleeveVector1),tmpParticle=_0x14df7a[0x1],sleeveVector1=new _0x2858cb[(_0x44fc5a(0x152))](),sleeveVector2=new _0x2858cb['Vector3'](),skeleton['bones'][_0x3853d0]['getWorldPosition'](sleeveVector1),skeleton[_0x44fc5a(0x10a)][_0x577513][_0x44fc5a(0x124)](sleeveVector2),sleeveVector3=new _0x2858cb[(_0x44fc5a(0x152))](),sleeveVector3[_0x44fc5a(0x1a4)](sleeveVector1,sleeveVector2,0.5),tmpParticle[_0x44fc5a(0x158)][_0x44fc5a(0x122)](sleeveVector3),tmpParticle=_0x14df7a[0x0],sleeveVector1=new _0x2858cb['Vector3'](),skeleton['bones'][_0x577513][_0x44fc5a(0x124)](sleeveVector1),tmpParticle[_0x44fc5a(0x158)][_0x44fc5a(0x122)](sleeveVector1);for(let _0x2ebc5b=0x0;_0x2ebc5b<=0x4;_0x2ebc5b++){const _0x2ca4ea=_0x14df7a[_0x2ebc5b];_0x2ca4ea[_0x44fc5a(0x12b)]['copy'](_0x2ca4ea[_0x44fc5a(0x158)]),_0x2ca4ea[_0x44fc5a(0x1a6)][_0x44fc5a(0x122)](_0x2ca4ea[_0x44fc5a(0x158)]);}}}function _updateRightCloth2(){const _0x343e12=_0x3b29f9,_0x1325a4=cloth2[_0x343e12(0x19a)];for(let _0x468448=0x0,_0x1076a9=_0x1325a4['length'];_0x468448<_0x1076a9;_0x468448++){const _0x2995b3=_0x1325a4[_0x468448];_0x2995b3['addForce'](gravity),_0x2995b3[_0x343e12(0x13c)](TIMESTEP_SQ);}const _0x5e030e=cloth2[_0x343e12(0x145)],_0x13d59b=_0x5e030e[_0x343e12(0x142)];for(let _0x50886f=0x0;_0x50886f<_0x13d59b;_0x50886f++){const _0x303f15=_0x5e030e[_0x50886f];satisfyConstraints(_0x303f15[0x0],_0x303f15[0x1],_0x303f15[0x2]);}for(let _0x184347=0x0,_0x32a425=_0x1325a4['length'];_0x184347<_0x32a425;_0x184347++){const _0x37e6c3=_0x1325a4[_0x184347],_0x36461d=_0x37e6c3[_0x343e12(0x12b)];_0x36461d['y']<-0x0&&(_0x36461d['y']=-0x0);}_rightPins(_0x1325a4);}function _rightPins(_0x5c57ad){const _0x231d2d=_0x3b29f9;if(skeleton!=null){sleeveVector1=new _0x2858cb[(_0x231d2d(0x152))](),sleeveVector2=new _0x2858cb[(_0x231d2d(0x152))]();var _0x3b0d26,_0x2b995c,_0x286a78;_0x3b0d26=0x1a,_0x2b995c=0x18,_0x286a78=0x16,tmpParticle=_0x5c57ad[0x4],sleeveVector1=new _0x2858cb[(_0x231d2d(0x152))](),skeleton['bones'][_0x3b0d26]['getWorldPosition'](sleeveVector1),tmpParticle[_0x231d2d(0x158)]['copy'](sleeveVector1),tmpParticle=_0x5c57ad[0x3],sleeveVector1=new _0x2858cb[(_0x231d2d(0x152))](),sleeveVector2=new _0x2858cb[(_0x231d2d(0x152))](),skeleton['bones'][_0x3b0d26][_0x231d2d(0x124)](sleeveVector1),skeleton[_0x231d2d(0x10a)][_0x2b995c][_0x231d2d(0x124)](sleeveVector2),sleeveVector3=new _0x2858cb[(_0x231d2d(0x152))](),sleeveVector3[_0x231d2d(0x1a4)](sleeveVector1,sleeveVector2,0.5),tmpParticle[_0x231d2d(0x158)][_0x231d2d(0x122)](sleeveVector3),tmpParticle=_0x5c57ad[0x2],sleeveVector1=new _0x2858cb[(_0x231d2d(0x152))](),skeleton[_0x231d2d(0x10a)][_0x2b995c][_0x231d2d(0x124)](sleeveVector1),tmpParticle[_0x231d2d(0x158)][_0x231d2d(0x122)](sleeveVector1),tmpParticle=_0x5c57ad[0x1],sleeveVector1=new _0x2858cb[(_0x231d2d(0x152))](),sleeveVector2=new _0x2858cb[(_0x231d2d(0x152))](),skeleton['bones'][_0x2b995c][_0x231d2d(0x124)](sleeveVector1),skeleton[_0x231d2d(0x10a)][_0x286a78][_0x231d2d(0x124)](sleeveVector2),sleeveVector3=new _0x2858cb['Vector3'](),sleeveVector3[_0x231d2d(0x1a4)](sleeveVector1,sleeveVector2,0.5),tmpParticle[_0x231d2d(0x158)][_0x231d2d(0x122)](sleeveVector3),tmpParticle=_0x5c57ad[0x0],sleeveVector1=new _0x2858cb[(_0x231d2d(0x152))](),skeleton[_0x231d2d(0x10a)][_0x286a78][_0x231d2d(0x124)](sleeveVector1),tmpParticle[_0x231d2d(0x158)][_0x231d2d(0x122)](sleeveVector1);for(let _0xb85af9=0x0;_0xb85af9<=0x4;_0xb85af9++){const _0x5df208=_0x5c57ad[_0xb85af9];_0x5df208[_0x231d2d(0x12b)]['copy'](_0x5df208[_0x231d2d(0x158)]),_0x5df208[_0x231d2d(0x1a6)][_0x231d2d(0x122)](_0x5df208[_0x231d2d(0x158)]);}}}const cloth=new Cloth(xSegs,ySegs),cloth2=new Cloth(xSegs,ySegs),pinsFormation=[];pins=[0x6],pinsFormation[_0x3b29f9(0x17e)](pins),pins=[0x0,0x1,0x2],pinsFormation[_0x3b29f9(0x17e)](pins),pins=[0x0],pinsFormation['push'](pins),pins=[],pinsFormation[_0x3b29f9(0x17e)](pins),pins=[0x0,cloth['w']],pinsFormation[_0x3b29f9(0x17e)](pins),pins=pinsFormation[0x1];function togglePins(){pins=pinsFormation[0x1];}let clothGeometry,clothGeometry2,sphere,object;function init(){const _0x459005=_0x3b29f9;camera=new _0x2858cb[(_0x459005(0x138))](0x2d,container['clientWidth']/container[_0x459005(0x108)],0x1,0x3e8),camera[_0x459005(0x12b)]['set'](0x0,0x2,0x6),camera[_0x459005(0x119)][_0x459005(0x16d)](0x0,0x0,0x0),clock=new _0x2858cb[(_0x459005(0x141))](),scene=new _0x2858cb[(_0x459005(0x157))](),scene['background']=null;const _0xb74782=new _0x2858cb[(_0x459005(0x131))](0xffffff,0xedae49);_0xb74782[_0x459005(0x12b)][_0x459005(0x16d)](0x0,0x14,0x0),scene[_0x459005(0x17c)](_0xb74782);const _0x32e8fb=new _0x2858cb['DirectionalLight'](0xffffff);_0x32e8fb['position'][_0x459005(0x16d)](0x1e,0xa,0x1e),_0x32e8fb[_0x459005(0x1a5)]=![],_0x32e8fb[_0x459005(0x16e)][_0x459005(0x193)][_0x459005(0x189)]=0x2,_0x32e8fb['shadow'][_0x459005(0x193)]['bottom']=-0x2,_0x32e8fb[_0x459005(0x16e)][_0x459005(0x193)][_0x459005(0x196)]=-0x2,_0x32e8fb[_0x459005(0x16e)][_0x459005(0x193)]['right']=0x2,_0x32e8fb['shadow'][_0x459005(0x193)]['near']=0.1,_0x32e8fb[_0x459005(0x16e)][_0x459005(0x193)][_0x459005(0x10d)]=0x28,scene['add'](_0x32e8fb);const _0x24bdb3=new _0x2858cb[(_0x459005(0x1ad))](),_0x3ce651=_0x24bdb3[_0x459005(0x19c)](_0x459005(0x1b0));_0x3ce651[_0x459005(0x187)]=0x10;const _0x51fc6e=new _0x2858cb['MeshLambertMaterial']({'map':_0x3ce651,'side':_0x2858cb[_0x459005(0x111)],'alphaTest':0.5});clothGeometry=new _0x2858cb[(_0x459005(0x17f))](clothFunction,cloth['w'],cloth['h']),object=new _0x2858cb[(_0x459005(0x169))](clothGeometry,_0x51fc6e),object['position'][_0x459005(0x16d)](0x0,0x0,0x0),object[_0x459005(0x1a5)]=!![],scene['add'](object),clothGeometry2=new _0x2858cb[(_0x459005(0x17f))](clothFunction,cloth['w'],cloth['h']),object=new _0x2858cb['Mesh'](clothGeometry2,_0x51fc6e),object[_0x459005(0x12b)][_0x459005(0x16d)](0x0,0x0,0x0),object[_0x459005(0x1a5)]=!![],scene[_0x459005(0x17c)](object),object[_0x459005(0x15d)]=new _0x2858cb[(_0x459005(0x134))]({'depthPacking':_0x2858cb['RGBADepthPacking'],'map':_0x3ce651,'alphaTest':0.5});const _0x35a559=new _0x2858cb[(_0x459005(0xfe))](),_0x2af7f1=new _0x2858cb[(_0x459005(0x180))]();_0x2af7f1[_0x459005(0x12e)](_0x459005(0x11d)),_0x35a559[_0x459005(0x137)](_0x2af7f1),_0x35a559['load'](_0x459005(0x123),function(_0x27709c){const _0x35fb12=_0x459005;if(backupImage!=null)backupImage['style'][_0x35fb12(0x1aa)]=_0x35fb12(0x178);model=_0x27709c[_0x35fb12(0x114)],scene[_0x35fb12(0x17c)](model),model['traverse'](function(_0x47b78d){const _0x2a0085=_0x35fb12;if(_0x47b78d[_0x2a0085(0x1a7)])_0x47b78d['castShadow']=!![];}),skeleton=new _0x2858cb['SkeletonHelper'](model),skeleton[_0x35fb12(0x136)]=![],scene[_0x35fb12(0x17c)](skeleton),createPanel();const _0x15db21=_0x27709c[_0x35fb12(0xfd)];mixer=new _0x2858cb['AnimationMixer'](model),idleAction=mixer['clipAction'](_0x15db21[0xa]),walkAction=mixer[_0x35fb12(0x110)](_0x15db21[0x0]),runAction=mixer['clipAction'](_0x15db21[0x8]),RPSDamn=mixer[_0x35fb12(0x110)](_0x15db21[0x2]),RPSHopping=mixer[_0x35fb12(0x110)](_0x15db21[0x3]),RPSYay=mixer[_0x35fb12(0x110)](_0x15db21[0x4]),RPSPunch=mixer['clipAction'](_0x15db21[0x5]),RPSShocked=mixer['clipAction'](_0x15db21[0x6]),waveAction=mixer[_0x35fb12(0x110)](_0x15db21[0x1]),setWeight(waveAction,0x1),actions=[idleAction,walkAction,runAction,RPSDamn,RPSHopping,RPSYay,RPSPunch,RPSShocked,waveAction],lastAction=walkAction,activateAllActions(),prepareCrossFade(lastAction,waveAction,0.1),mixer[_0x35fb12(0x14e)](_0x35fb12(0x199),function(_0x5476a0){const _0x3f04f7=_0x35fb12;let _0x174e67=_0x5476a0[_0x3f04f7(0x109)][_0x3f04f7(0x14c)][_0x3f04f7(0x10c)];_0x174e67==_0x3f04f7(0x103)&&(triggerState[_0x3f04f7(0x104)]&&(triggerState[_0x3f04f7(0x104)]=![],triggerState[_0x3f04f7(0x143)]&&(triggerState[_0x3f04f7(0x143)]=![],prepareCrossFade(lastAction,RPSShocked,0.25),triggerState[_0x3f04f7(0x11e)]=!![]),triggerState[_0x3f04f7(0x1a8)]&&(triggerState[_0x3f04f7(0x1a8)]=![],prepareCrossFade(lastAction,RPSDamn,0.25),triggerState[_0x3f04f7(0x1a2)]=!![]),triggerState[_0x3f04f7(0x13f)]&&(triggerState[_0x3f04f7(0x13f)]=![],prepareCrossFade(lastAction,RPSYay,0.25),triggerState['happyOn']=!![]))),_0x174e67==_0x3f04f7(0x1a9)&&(triggerState[_0x3f04f7(0x1a2)]&&(triggerState[_0x3f04f7(0x1a2)]=![],prepareCrossFade(lastAction,RPSHopping,0.2))),_0x174e67==_0x3f04f7(0x198)&&(triggerState[_0x3f04f7(0x183)]&&(triggerState[_0x3f04f7(0x183)]=![],prepareCrossFade(lastAction,waveAction,0.2))),_0x174e67=='RPS.shokku'&&(triggerState[_0x3f04f7(0x11e)]&&(triggerState[_0x3f04f7(0x11e)]=![],prepareCrossFade(lastAction,RPSHopping,0.2)));}),mixer[_0x35fb12(0x14e)](_0x35fb12(0x155),function(_0x1c2f39){console['log']('finished');}),animate(0x0),container[_0x35fb12(0x13d)](RPSbutton);}),renderer=new _0x2858cb[(_0x459005(0x1ac))]({'antialias':!![],'alpha':!![]}),renderer['setSize'](container[_0x459005(0x150)],container[_0x459005(0x108)]),renderer['setPixelRatio'](window[_0x459005(0x168)]),renderer[_0x459005(0x19f)]=_0x2858cb[_0x459005(0x17d)],renderer['shadowMap'][_0x459005(0x1ab)]=!![],renderer[_0x459005(0x15f)](0x0,0x0),container[_0x459005(0x13d)](renderer['domElement']),RPSbutton=document[_0x459005(0x10f)](_0x459005(0x13b)),RPSbutton2=document['getElementById'](_0x459005(0x1af)),RPSbutton3=document['getElementById'](_0x459005(0x197)),RPSbutton4=document[_0x459005(0x10f)](_0x459005(0x16a)),RPSbutton2==null&&(RPSbutton2=document[_0x459005(0x185)]('button')),RPSbutton2[_0x459005(0x112)](_0x459005(0x11b),'グー'),RPSbutton2[_0x459005(0x188)]='background-image:\x20url(\x22https://uploads-ssl.webflow.com/6152c4ba477fccf758106a16/61710c09a2f9b7ec12190f84_rock4.svg\x22);\x20background-size:\x20cover;\x20z-index:\x209999999;\x20font-size:\x2018px;\x20border-radius:\x20100%;\x20width:\x2080px;\x20height:\x2080px;\x20position:\x20absolute;\x20right:\x20110px;\x20bottom:\x20-10px',RPSbutton2[_0x459005(0x14e)](_0x459005(0x13a),_0x2fa3b8=>{const _0xae8450=_0x459005;triggerState['rock']!=!![]&&triggerState[_0xae8450(0x1a8)]!=!![]&&triggerState[_0xae8450(0x13f)]!=!![]&&(prepareCrossFade(lastAction,RPSPunch,0.3),triggerState[_0xae8450(0x104)]=!![],triggerState[_0xae8450(0x143)]=!![]);}),RPSbutton3==null&&(RPSbutton3=document[_0x459005(0x185)](_0x459005(0x144))),RPSbutton2[_0x459005(0x112)](_0x459005(0x11b),_0x459005(0x159)),RPSbutton3['style']=_0x459005(0x153),RPSbutton3[_0x459005(0x14e)]('click',_0x1a279e=>{const _0xa35a32=_0x459005;triggerState[_0xa35a32(0x143)]!=!![]&&triggerState['paper']!=!![]&&triggerState[_0xa35a32(0x13f)]!=!![]&&(prepareCrossFade(lastAction,RPSPunch,0.3),triggerState[_0xa35a32(0x104)]=!![],triggerState['scissors']=!![]);}),RPSbutton4==null&&(RPSbutton4=document[_0x459005(0x185)](_0x459005(0x144))),RPSbutton2[_0x459005(0x112)](_0x459005(0x11b),'パー'),RPSbutton4[_0x459005(0x188)]=_0x459005(0x12c),RPSbutton4[_0x459005(0x14e)](_0x459005(0x13a),_0x2d3283=>{const _0x5dd5ff=_0x459005;triggerState[_0x5dd5ff(0x143)]!=!![]&&triggerState['paper']!=!![]&&triggerState[_0x5dd5ff(0x13f)]!=!![]&&(prepareCrossFade(lastAction,RPSPunch,0.3),triggerState[_0x5dd5ff(0x104)]=!![],triggerState['paper']=!![]);}),container[_0x459005(0x188)][_0x459005(0x19d)](_0x459005(0x12b),_0x459005(0x101)),RPSbutton==null&&(RPSbutton=document[_0x459005(0x185)](_0x459005(0x144))),RPSbutton2[_0x459005(0x112)](_0x459005(0x11b),'Play!'),RPSbutton[_0x459005(0x188)]=_0x459005(0x16f),RPSbutton[_0x459005(0x14e)](_0x459005(0x13a),_0xf099e4=>{prepareCrossFade(lastAction,RPSHopping,0.2),RPSButtonsOn();}),window[_0x459005(0x14e)](_0x459005(0x163),onWindowResize);}function createPanel(){const _0x5ba39f=_0x3b29f9,_0x2cc14d=new GUI({'width':0x190});_0x2cc14d['hide']();const _0x5348aa=_0x2cc14d[_0x5ba39f(0x18e)](_0x5ba39f(0x118)),_0x4a5fda=_0x2cc14d['addFolder'](_0x5ba39f(0x182)),_0x46f7a4=_0x2cc14d['addFolder']('Pausing/Stepping'),_0x3d81ef=_0x2cc14d[_0x5ba39f(0x18e)](_0x5ba39f(0x177)),_0x2d6511=_0x2cc14d[_0x5ba39f(0x18e)](_0x5ba39f(0x10e)),_0x213a4e=_0x2cc14d['addFolder'](_0x5ba39f(0x12d));settings={'show\x20model':!![],'show\x20skeleton':![],'deactivate\x20all':deactivateAllActions,'activate\x20all':activateAllActions,'pause/continue':pauseContinue,'make\x20single\x20step':toSingleStepMode,'modify\x20step\x20size':0.05,'from\x20walk\x20to\x20idle':function(){prepareCrossFade(walkAction,idleAction,0.25);},'from\x20idle\x20to\x20walk':function(){prepareCrossFade(idleAction,walkAction,0.25);},'from\x20walk\x20to\x20run':function(){prepareCrossFade(walkAction,runAction,0.25);},'from\x20run\x20to\x20walk':function(){prepareCrossFade(runAction,walkAction,0.25);},'use\x20default\x20duration':!![],'set\x20custom\x20duration':3.5,'modify\x20idle\x20weight':0x0,'modify\x20walk\x20weight':0x1,'modify\x20run\x20weight':0x0,'modify\x20damnWeight\x20weight':0x0,'modify\x20hoppingWeight\x20weight':0x0,'modify\x20yayWeight\x20weight':0x0,'modify\x20punchWeight\x20weight':0x0,'modify\x20shockedWeight\x20weight':0x0,'modify\x20waveWeight\x20weight':0x0,'modify\x20time\x20scale':0x1},_0x4a5fda[_0x5ba39f(0x17c)](settings,_0x5ba39f(0x151)),_0x4a5fda[_0x5ba39f(0x17c)](settings,_0x5ba39f(0x172)),_0x46f7a4[_0x5ba39f(0x17c)](settings,_0x5ba39f(0x154)),_0x46f7a4[_0x5ba39f(0x17c)](settings,_0x5ba39f(0x194)),_0x46f7a4[_0x5ba39f(0x17c)](settings,'modify\x20step\x20size',0.01,0.1,0.001),crossFadeControls[_0x5ba39f(0x17e)](_0x3d81ef[_0x5ba39f(0x17c)](settings,'from\x20walk\x20to\x20idle')),crossFadeControls[_0x5ba39f(0x17e)](_0x3d81ef[_0x5ba39f(0x17c)](settings,_0x5ba39f(0x11a))),crossFadeControls[_0x5ba39f(0x17e)](_0x3d81ef['add'](settings,_0x5ba39f(0x164))),crossFadeControls[_0x5ba39f(0x17e)](_0x3d81ef[_0x5ba39f(0x17c)](settings,_0x5ba39f(0x129))),_0x3d81ef['add'](settings,_0x5ba39f(0x176)),_0x3d81ef[_0x5ba39f(0x17c)](settings,_0x5ba39f(0x132),0x0,0xa,0.01),_0x2d6511[_0x5ba39f(0x17c)](settings,'modify\x20idle\x20weight',0x0,0x1,0.01)[_0x5ba39f(0x1ae)]()[_0x5ba39f(0x18c)](function(_0x34246c){setWeight(idleAction,_0x34246c);}),_0x2d6511[_0x5ba39f(0x17c)](settings,_0x5ba39f(0x170),0x0,0x1,0.01)[_0x5ba39f(0x1ae)]()[_0x5ba39f(0x18c)](function(_0xb6b62b){setWeight(walkAction,_0xb6b62b);}),_0x2d6511[_0x5ba39f(0x17c)](settings,'modify\x20run\x20weight',0x0,0x1,0.01)[_0x5ba39f(0x1ae)]()[_0x5ba39f(0x18c)](function(_0x24a760){setWeight(runAction,_0x24a760);}),_0x2d6511[_0x5ba39f(0x17c)](settings,'modify\x20damnWeight\x20weight',0x0,0x1,0.01)[_0x5ba39f(0x1ae)]()['onChange'](function(_0xdd0040){setWeight(RPSDamn,_0xdd0040);}),_0x2d6511['add'](settings,_0x5ba39f(0x1a0),0x0,0x1,0.01)[_0x5ba39f(0x1ae)]()[_0x5ba39f(0x18c)](function(_0x1ccfa5){setWeight(RPSHopping,_0x1ccfa5);}),_0x2d6511[_0x5ba39f(0x17c)](settings,_0x5ba39f(0x14f),0x0,0x1,0.01)[_0x5ba39f(0x1ae)]()[_0x5ba39f(0x18c)](function(_0x17fa8c){setWeight(RPSYay,_0x17fa8c);}),_0x2d6511['add'](settings,_0x5ba39f(0x1a1),0x0,0x1,0.01)[_0x5ba39f(0x1ae)]()['onChange'](function(_0xab8d27){setWeight(RPSPunch,_0xab8d27);}),_0x2d6511[_0x5ba39f(0x17c)](settings,'modify\x20shockedWeight\x20weight',0x0,0x1,0.01)['listen']()[_0x5ba39f(0x18c)](function(_0x5614f9){setWeight(RPSShocked,_0x5614f9);}),_0x2d6511[_0x5ba39f(0x17c)](settings,'modify\x20waveWeight\x20weight',0x0,0x1,0.01)['listen']()[_0x5ba39f(0x18c)](function(_0x2a0958){setWeight(waveAction,_0x2a0958);}),_0x213a4e[_0x5ba39f(0x17c)](settings,_0x5ba39f(0x18f),0x0,1.5,0.01)['onChange'](modifyTimeScale),_0x5348aa[_0x5ba39f(0x113)](),_0x4a5fda[_0x5ba39f(0x113)](),_0x46f7a4['open'](),_0x3d81ef[_0x5ba39f(0x113)](),_0x2d6511[_0x5ba39f(0x113)](),_0x213a4e[_0x5ba39f(0x113)](),crossFadeControls[_0x5ba39f(0x18a)](function(_0x560355){const _0x4261b2=_0x5ba39f;_0x560355[_0x4261b2(0x18d)]=_0x560355[_0x4261b2(0x147)][_0x4261b2(0x149)]['parentElement'][_0x4261b2(0x174)],_0x560355[_0x4261b2(0x106)]=_0x560355['domElement'][_0x4261b2(0x116)][_0x4261b2(0x174)],_0x560355[_0x4261b2(0x121)]=function(){const _0x495165=_0x4261b2;_0x560355[_0x495165(0x18d)][_0x495165(0x17c)](_0x495165(0x13e)),_0x560355[_0x495165(0x106)][_0x495165(0x17c)](_0x495165(0x162));},_0x560355[_0x4261b2(0x184)]=function(){const _0x59b5bd=_0x4261b2;_0x560355[_0x59b5bd(0x18d)][_0x59b5bd(0x14b)](_0x59b5bd(0x13e)),_0x560355[_0x59b5bd(0x106)][_0x59b5bd(0x14b)](_0x59b5bd(0x162));};});}function modifyTimeScale(_0x221030){const _0xf36ed7=_0x3b29f9;mixer[_0xf36ed7(0x171)]=_0x221030;}function deactivateAllActions(){const _0x57c1aa=_0x3b29f9;actions[_0x57c1aa(0x18a)](function(_0x211897){const _0x4d3019=_0x57c1aa;_0x211897[_0x4d3019(0x19e)]();});}function activateAllActions(){const _0x2e49c9=_0x3b29f9;setWeight(idleAction,settings[_0x2e49c9(0x161)]),setWeight(walkAction,settings[_0x2e49c9(0x170)]),setWeight(runAction,settings[_0x2e49c9(0x156)]),setWeight(RPSDamn,settings[_0x2e49c9(0x127)]),setWeight(RPSHopping,settings['modify\x20RPSHopping\x20weight']),setWeight(RPSYay,settings['modify\x20RPSYay\x20weight']),setWeight(RPSPunch,settings[_0x2e49c9(0x166)]),setWeight(RPSShocked,settings[_0x2e49c9(0x11c)]),setWeight(waveAction,settings[_0x2e49c9(0x15e)]),actions[_0x2e49c9(0x18a)](function(_0x312b29){const _0x91f804=_0x2e49c9;_0x312b29[_0x91f804(0x117)]();});}function pauseContinue(){const _0x98c7dd=_0x3b29f9;singleStepMode?(singleStepMode=![],unPauseAllActions()):idleAction[_0x98c7dd(0x160)]?unPauseAllActions():pauseAllActions();}function pauseAllActions(){actions['forEach'](function(_0x296b0e){const _0x1ef28c=_0x4f48;_0x296b0e[_0x1ef28c(0x160)]=!![];});}function unPauseAllActions(){const _0x251f2c=_0x3b29f9;actions[_0x251f2c(0x18a)](function(_0x1a74ac){const _0x172ec9=_0x251f2c;_0x1a74ac[_0x172ec9(0x160)]=![];});}function toSingleStepMode(){const _0x5bf41a=_0x3b29f9;unPauseAllActions(),singleStepMode=!![],sizeOfNextStep=settings[_0x5bf41a(0x14a)];}function prepareCrossFade(_0x494878,_0x417aec,_0x36949d){lastAction=_0x417aec;const _0x3af282=setCrossFadeDuration(_0x36949d);singleStepMode=![],unPauseAllActions(),!![]?executeCrossFade(_0x494878,_0x417aec,_0x3af282):synchronizeCrossFade(_0x494878,_0x417aec,_0x3af282);}function setCrossFadeDuration(_0x55d5cc){const _0x4511a7=_0x3b29f9;return settings[_0x4511a7(0x176)]?_0x55d5cc:settings[_0x4511a7(0x132)];}function synchronizeCrossFade(_0x4ab5f8,_0x5a47ba,_0x4452f9){const _0x569dd3=_0x3b29f9;mixer[_0x569dd3(0x14e)](_0x569dd3(0x199),_0x3bcecf);function _0x3bcecf(_0x2d3d9e){const _0x5577d0=_0x569dd3;_0x2d3d9e[_0x5577d0(0x109)]===_0x4ab5f8&&(mixer[_0x5577d0(0x105)]('loop',_0x3bcecf),executeCrossFade(_0x4ab5f8,_0x5a47ba,_0x4452f9));}}function executeCrossFade(_0x3eece1,_0xc4bb88,_0x3dc137){const _0x1f2883=_0x3b29f9;setWeight(_0xc4bb88,0x1),_0xc4bb88[_0x1f2883(0x11f)]=0x0,_0x3eece1[_0x1f2883(0x16b)](_0xc4bb88,_0x3dc137,!![]);}function setWeight(_0x24185d,_0x2881cf){const _0x63fb4e=_0x3b29f9;_0x24185d[_0x63fb4e(0x1ab)]=!![],_0x24185d[_0x63fb4e(0x148)](0x1),_0x24185d[_0x63fb4e(0x181)](_0x2881cf);}function updateWeightSliders(){const _0xecf6e0=_0x3b29f9;settings[_0xecf6e0(0x161)]=idleWeight,settings[_0xecf6e0(0x170)]=walkWeight,settings['modify\x20run\x20weight']=runWeight,settings[_0xecf6e0(0x179)]=damnWeight,settings[_0xecf6e0(0x1a0)]=hoppingWeight,settings[_0xecf6e0(0x14f)]=yayWeight,settings['modify\x20punchWeight\x20weight']=punchWeight,settings[_0xecf6e0(0x130)]=shockedWeight,settings[_0xecf6e0(0x17a)]=waveWeight;}function updateCrossFadeControls(){const _0x1b9d5c=_0x3b29f9;crossFadeControls[_0x1b9d5c(0x18a)](function(_0x4935aa){_0x4935aa['setDisabled']();}),idleWeight===0x1&&walkWeight===0x0&&runWeight===0x0&&crossFadeControls[0x1][_0x1b9d5c(0x184)](),idleWeight===0x0&&walkWeight===0x1&&runWeight===0x0&&(crossFadeControls[0x0][_0x1b9d5c(0x184)](),crossFadeControls[0x2][_0x1b9d5c(0x184)]()),idleWeight===0x0&&walkWeight===0x0&&runWeight===0x1&&crossFadeControls[0x3][_0x1b9d5c(0x184)]();}function onWindowResize(){const _0x48bd76=_0x3b29f9;camera[_0x48bd76(0x115)]=container[_0x48bd76(0x150)]/container[_0x48bd76(0x108)],camera[_0x48bd76(0x190)](),renderer['setSize'](container['clientWidth'],container[_0x48bd76(0x108)]);}function animate(_0x390e5d){const _0x2e9517=_0x3b29f9;requestAnimationFrame(animate),updateCloth(_0x390e5d),renderCloth(),idleWeight=idleAction[_0x2e9517(0x102)](),walkWeight=walkAction[_0x2e9517(0x102)](),runWeight=runAction[_0x2e9517(0x102)](),damnWeight=RPSDamn['getEffectiveWeight'](),hoppingWeight=RPSHopping[_0x2e9517(0x102)](),yayWeight=RPSYay[_0x2e9517(0x102)](),punchWeight=RPSPunch[_0x2e9517(0x102)](),shockedWeight=RPSShocked['getEffectiveWeight'](),waveWeight=waveAction[_0x2e9517(0x102)](),updateCrossFadeControls();let _0x252976=clock[_0x2e9517(0x107)]();singleStepMode&&(_0x252976=sizeOfNextStep,sizeOfNextStep=0x0),mixer[_0x2e9517(0x14d)](_0x252976),renderer[_0x2e9517(0x165)](scene,camera);}function renderCloth(){const _0x1d4785=_0x3b29f9,_0x542657=cloth['particles'];for(let _0x222456=0x0,_0x590c09=_0x542657[_0x1d4785(0x142)];_0x222456<_0x590c09;_0x222456++){const _0x19da43=_0x542657[_0x222456][_0x1d4785(0x12b)];clothGeometry[_0x1d4785(0x16c)][_0x1d4785(0x12b)][_0x1d4785(0x17b)](_0x222456,_0x19da43['x'],_0x19da43['y'],_0x19da43['z']);}clothGeometry[_0x1d4785(0x16c)][_0x1d4785(0x12b)][_0x1d4785(0x18b)]=!![],clothGeometry['computeVertexNormals']();const _0x2933f8=cloth2['particles'];for(let _0x5609c4=0x0,_0x213863=_0x2933f8[_0x1d4785(0x142)];_0x5609c4<_0x213863;_0x5609c4++){const _0x4962a6=_0x2933f8[_0x5609c4][_0x1d4785(0x12b)];clothGeometry2[_0x1d4785(0x16c)][_0x1d4785(0x12b)][_0x1d4785(0x17b)](_0x5609c4,_0x4962a6['x'],_0x4962a6['y'],_0x4962a6['z']);}clothGeometry2[_0x1d4785(0x16c)]['position']['needsUpdate']=!![],clothGeometry2[_0x1d4785(0x186)]();}init();