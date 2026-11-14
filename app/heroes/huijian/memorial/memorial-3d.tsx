"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef } from "react";
import * as ThreeVendor from "./vendor/three.module.min.js";
import { flowers } from "./flowers";

const THREE: any = ThreeVendor;

type Props = { ritual: string; selected: string; offerings: string[]; nextSlot: number; revision: number };

export default function Memorial3D({ ritual, selected, offerings, nextSlot, revision }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ ritual, selected, offerings, nextSlot, revision });
  useEffect(() => { stateRef.current = { ritual, selected, offerings, nextSlot, revision }; }, [ritual, selected, offerings, nextSlot, revision]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let disposed = false;
    let cleanup = () => {};

    async function start() {
      if (disposed || !mount) return;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x899795);
      scene.fog = new THREE.FogExp2(0x899795, 0.029);
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.set(0, 3.6, 11.5);

      const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = .9;
      mount.appendChild(renderer.domElement);

      scene.add(new THREE.HemisphereLight(0xd2d9d5, 0x35463d, 1.9));
      const sun = new THREE.DirectionalLight(0xe8e8df, 3.35);
      sun.position.set(-7, 11, 6); sun.castShadow = true;
      sun.shadow.intensity = .72;
      sun.shadow.radius = 3;
      sun.shadow.mapSize.set(2048, 2048); sun.shadow.camera.left = -14; sun.shadow.camera.right = 14; sun.shadow.camera.top = 14; sun.shadow.camera.bottom = -14;
      scene.add(sun);

      const mat = (color: number, roughness = .8, metalness = 0) => new THREE.MeshStandardMaterial({ color, roughness, metalness });
      const mesh = (geometry: any, material: any, position: number[], rotation: number[] = [0,0,0], scale: number[] = [1,1,1]) => {
        const object = new THREE.Mesh(geometry, material); object.position.set(...position); object.rotation.set(...rotation); object.scale.set(...scale); object.castShadow = true; object.receiveShadow = true; scene.add(object); return object;
      };

      mesh(new THREE.PlaneGeometry(70, 65, 1, 1), mat(0x496744, 1), [0,-.06,-10], [-Math.PI/2,0,0]);
      const lake = mesh(new THREE.PlaneGeometry(42, 14), new THREE.MeshPhysicalMaterial({ color:0x4c7f89, roughness:.18, metalness:.1, transmission:.08, transparent:true, opacity:.86 }), [0,.01,-14], [-Math.PI/2,0,0]);

      const mountainMat = mat(0x4b6658, 1);
      [[-12,2,-25,10,6],[0,3,-30,15,8],[13,2,-27,12,7],[-22,1,-32,16,9],[24,1,-35,18,10]].forEach(([x,y,z,sx,sy]) => mesh(new THREE.ConeGeometry(1,1,5), mountainMat, [x,y,z], [0,.35,0], [sx,sy,sx]));

      function addTree(x:number,z:number,s=1) {
        const group = new THREE.Group(); group.position.set(x,0,z); group.scale.setScalar(s);
        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(.11,.16,1.6,7), mat(0x4a3524,1)); trunk.position.y=.8; trunk.castShadow=true; group.add(trunk);
        [1.15,1.7,2.2].forEach((y,i) => { const crown = new THREE.Mesh(new THREE.ConeGeometry(.78-i*.09,1.45,9), mat(i===1?0x264a35:0x315a3d,1)); crown.position.y=y; crown.castShadow=true; group.add(crown); });
        scene.add(group);
      }
      for(let i=0;i<34;i++){ const side=i%2?-1:1; const x=side*(4.5+(i*1.73)%9); const z=-7+(i*2.17)%20; addTree(x,z,.65+(i%5)*.12); }

      const grave = new THREE.Group(); grave.position.set(0,0,-2.6); scene.add(grave);
      const shape = new THREE.Shape(); shape.moveTo(-1.3,0); shape.lineTo(-1.3,2.45); shape.absarc(0,2.45,1.3,Math.PI,0,true); shape.lineTo(1.3,0); shape.closePath();
      const stoneGeo = new THREE.ExtrudeGeometry(shape,{ depth:.5,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.07,bevelThickness:.06 }); stoneGeo.center();
      const stone = new THREE.Mesh(stoneGeo,mat(0xb7beb7,.72)); stone.position.set(0,2.2,.27); stone.castShadow=true; stone.receiveShadow=true; grave.add(stone);
      const stoneFoot=new THREE.Mesh(new THREE.BoxGeometry(2.9,.12,.68),mat(0x9aa39e,.9));
      stoneFoot.position.set(0,.28,.36); stoneFoot.castShadow=true; stoneFoot.receiveShadow=true; grave.add(stoneFoot);

      // A broad, low offering terrace holds both ceremonial and visitor flowers.
      const offeringBase=new THREE.Mesh(new THREE.BoxGeometry(3.55,.22,2.9),mat(0x9aa39e,.9));
      offeringBase.position.set(0,.11,1.47); offeringBase.castShadow=true; offeringBase.receiveShadow=true; grave.add(offeringBase);
      const offeringEdge=new THREE.Mesh(new THREE.BoxGeometry(2.7,.035,.025),mat(0x82775d,.62,.25));
      offeringEdge.position.set(0,.225,2.925); grave.add(offeringEdge);

      // A Chinese memorial terrace: upright merit steles, cypress and restrained bronze details.
      const honorStone = mat(0xaab2ad,.92);
      const darkStone = mat(0x929b96,.9);
      const ribbon = mat(0x9b9787,.68,.12);
      [-2.72,2.72].forEach((x,index)=>{
        const stele=new THREE.Group(); stele.position.set(x,0,-1.18); stele.rotation.y=index===0?.1:-.1; scene.add(stele);
        const foot=new THREE.Mesh(new THREE.BoxGeometry(1.05,.2,.72),darkStone); foot.position.y=.1; foot.castShadow=true; stele.add(foot);
        const body=new THREE.Mesh(new THREE.BoxGeometry(.78,2.35,.38),honorStone); body.position.y=1.33; body.castShadow=true; body.receiveShadow=true; stele.add(body);
        const crown=new THREE.Mesh(new THREE.BoxGeometry(.94,.15,.52),darkStone); crown.position.y=2.55; crown.castShadow=true; stele.add(crown);
        const band=new THREE.Mesh(new THREE.BoxGeometry(.82,.14,.025),ribbon); band.position.set(0,1.88,.205); stele.add(band);

        const inscriptionCanvas=document.createElement("canvas"); inscriptionCanvas.width=192; inscriptionCanvas.height=512;
        const inscriptionCtx=inscriptionCanvas.getContext("2d")!; inscriptionCtx.clearRect(0,0,192,512); inscriptionCtx.textAlign="center"; inscriptionCtx.fillStyle="#202825";
        inscriptionCtx.font="600 58px SimSun"; inscriptionCtx.textBaseline="middle"; inscriptionCtx.fillStyle="#37413b"; const words=index===0?["忠","诚","如","山"]:["担","当","如","铁"];
        words.forEach((word,row)=>inscriptionCtx.fillText(word,96,112+row*96));
        const inscriptionTexture=new THREE.CanvasTexture(inscriptionCanvas); inscriptionTexture.colorSpace=THREE.SRGBColorSpace;
        const inscription=new THREE.Mesh(new THREE.PlaneGeometry(.52,1.38),new THREE.MeshBasicMaterial({map:inscriptionTexture,transparent:true,depthWrite:false})); inscription.position.set(0,1.28,.207); stele.add(inscription);
      });

      // Low stone guards define the sacred ground without creating a front walkway.
      [-1,1].forEach(side=>{
        const rail=new THREE.Mesh(new THREE.BoxGeometry(2.35,.25,.34),darkStone); rail.position.set(side*3.25,.125,.15); rail.rotation.y=side*.13; rail.castShadow=true; rail.receiveShadow=true; scene.add(rail);
        for(let i=0;i<3;i++){
          const postX=side*(2.3+i*.65); const railCenterX=side*3.25; const railAngle=side*.13;
          const postZ=.15-Math.sin(railAngle)*(postX-railCenterX);
          const post=new THREE.Mesh(new THREE.BoxGeometry(.22,.68,.22),honorStone);
          post.position.set(postX,.4,postZ); post.rotation.y=railAngle; post.castShadow=true; scene.add(post);
        }
      });

      // Paired cypresses provide a living guard of honor close to the monument.
      [[-3.75,-1.9,.82],[3.75,-1.9,.82],[-4.35,-3.05,.72],[4.35,-3.05,.72]].forEach(([x,z,s])=>addTree(x,z,s));
      const heroLight=new THREE.SpotLight(0xe9e4d7,4.1,17,.4,.76,1.25); heroLight.position.set(0,7.8,3.8); heroLight.target.position.set(0,1.7,-2.6); scene.add(heroLight,heroLight.target);

      const labelCanvas = document.createElement("canvas"); labelCanvas.width=768; labelCanvas.height=1024; const ctx=labelCanvas.getContext("2d")!;
      ctx.fillStyle="rgba(0,0,0,0)"; ctx.fillRect(0,0,768,1024); ctx.textAlign="center"; ctx.fillStyle="#27352f";
      ctx.font="600 52px SimSun"; ctx.fillText("反 诈 英 雄",384,110);
      ctx.fillStyle="#e6e7de"; ctx.fillRect(266,154,236,276);
      ctx.strokeStyle="#657169"; ctx.lineWidth=3; ctx.strokeRect(266,154,236,276);
      ctx.fillStyle="#27352f";
      ctx.font="700 120px SimSun"; ctx.fillText("吴  恺",384,575);
      ctx.fillRect(330,620,108,5);
      ctx.font="600 46px SimSun"; ctx.fillText("以微光刺破黑暗",384,710); ctx.fillText("以孤勇守护人间",384,780);
      ctx.font="600 42px SimSun"; ctx.fillText("永远怀念",384,900);
      const labelTexture=new THREE.CanvasTexture(labelCanvas); labelTexture.colorSpace=THREE.SRGBColorSpace;
      const portrait=new window.Image();
      portrait.onload=()=>{
        if(disposed)return;
        const cropHeight=portrait.naturalHeight*.66;
        const cropWidth=cropHeight*220/260;
        const cropX=Math.max(0,Math.min(portrait.naturalWidth-cropWidth,portrait.naturalWidth*.48-cropWidth/2));
        ctx.drawImage(portrait,cropX,portrait.naturalHeight*.25,cropWidth,cropHeight,274,162,220,260);
        labelTexture.needsUpdate=true;
      };
      portrait.src="/wukai.png";
      const label=new THREE.Mesh(new THREE.PlaneGeometry(2.15,2.88),new THREE.MeshBasicMaterial({map:labelTexture,transparent:true,depthWrite:false})); label.position.set(0,2.37,.66); label.renderOrder=5; grave.add(label);

      const flowerLayer = new THREE.Group(); scene.add(flowerLayer);
      const flowerColors:Record<string,number>=Object.fromEntries(flowers.map(flower=>[flower.id,flower.color]));
      const offeredFlowerScale=.96;
      function flowerPosition(index:number) {
        const slot=Math.min(index,23), row=Math.floor(slot/8);
        const column=[3,4,2,5,1,6,0,7][slot%8];
        return new THREE.Vector3((column-3.5)*.40+(row%2?.055:0),.225,-1.90+row*.85);
      }
      function styleFlower(g:any,id:string) {
        const shape=flowers.find(flower=>flower.id===id)?.shape??"chrysanthemum";
        const rose=shape==="rose", carnation=shape==="carnation";
        const chrysanthemum=shape==="chrysanthemum"||rose||carnation, lily=shape==="lily";
        const count=chrysanthemum?24:lily?6:12;
        g.userData.petals.forEach((petal:any,p:number)=>{
          petal.visible=p<count;
          const inner=chrysanthemum&&p>=12;
          const angle=(p%12)/(lily?6:12)*Math.PI*2+(inner?Math.PI/12:0);
          const radius=rose?(inner?.045:.085):inner?.072:lily?.105:.115;
          petal.position.set(Math.cos(angle)*radius,.39+Math.sin(angle)*radius,inner?(rose?.05:.028):0);
          petal.rotation.z=angle-Math.PI/2;
          petal.scale.set(rose?.065:carnation?.05:lily?.052:chrysanthemum?.033:.043,inner?.069:lily?.102:.088,rose?.04:.025);
          petal.material.color.setHex(flowerColors[id]??flowerColors.chrysanthemum);
        });
        const center=g.userData.center;
        center.material.color.setHex(shape==="sunflower"?0x624023:rose?flowerColors[id]:0xd5b76b);
        center.scale.setScalar(rose?.40:chrysanthemum?.60:lily?.45:.90);
        g.userData.kind=id;
      }
      function createFlower(id:string,index:number) {
        const g=new THREE.Group();
        const stem=new THREE.Mesh(new THREE.CylinderGeometry(.018,.024,.32,6),mat(0x315c37,.9));
        stem.position.y=.16; g.add(stem);
        const center=new THREE.Mesh(new THREE.SphereGeometry(.09,10,8),mat(id==="sunflower"?0x694317:0xd6b857,.7));
        center.position.set(0,.39,.035); center.scale.z=.65; g.add(center);
        const petals:any[]=[], petalGeometry=new THREE.SphereGeometry(1,12,8);
        const petalMaterial=mat(flowerColors[id]??0xffffff,.78);
        for(let p=0;p<24;p++) {
          const petal=new THREE.Mesh(petalGeometry,petalMaterial);
          petals.push(petal); g.add(petal);
        }
        const leafMaterial=mat(0x426743,.95);
        [-1,1].forEach(side=>{
          const leaf=new THREE.Mesh(new THREE.SphereGeometry(1,12,8),leafMaterial);
          leaf.scale.set(.067,.023,.014); leaf.rotation.z=side*.45;
          leaf.position.set(side*.045,side===1?.16:.11,.005); g.add(leaf);
        });
        g.userData.petals=petals; g.userData.center=center;
        styleFlower(g,id);
        g.children.forEach((part:any)=>{part.castShadow=true;part.receiveShadow=true;});
        g.position.copy(flowerPosition(index));
        g.scale.setScalar(offeredFlowerScale);
        flowerLayer.add(g); return g;
      }

      const visitor=new THREE.Group(); visitor.position.set(-.7,0,6.5); visitor.visible=false; scene.add(visitor);
      const coat=mat(0x35403e,.96), trousers=mat(0x252c2b,.98), skin=mat(0xb58d73,.95), shoes=mat(0x1b201f,.96);
      const legs:any[]=[];
      [-.18,.18].forEach((x,index)=>{
        const leg=new THREE.Group(); leg.position.set(x,1.10,0); leg.scale.y=1.13; visitor.add(leg); legs.push(leg);
        const thigh=new THREE.Mesh(new THREE.CylinderGeometry(.145,.13,.48,10),trousers); thigh.position.y=-.24; thigh.castShadow=true; leg.add(thigh);
        const knee=new THREE.Mesh(new THREE.SphereGeometry(.13,10,8),trousers); knee.position.y=-.48; leg.add(knee);
        const calf=new THREE.Mesh(new THREE.CylinderGeometry(.12,.095,.43,10),trousers); calf.position.y=-.69; calf.castShadow=true; leg.add(calf);
        const shoe=new THREE.Mesh(new THREE.BoxGeometry(.23,.14,.38),shoes); shoe.position.set(0,-.93,-.09); shoe.castShadow=true; leg.add(shoe);
        leg.rotation.x=index===0?.04:-.04;
      });
      // A rounded waist overlaps both thighs and the rotating coat hem while bowing.
      const waist=new THREE.Mesh(new THREE.SphereGeometry(.36,20,16),trousers);
      waist.position.set(0,1.11,0); waist.scale.set(1,.47,.76); waist.castShadow=true; visitor.add(waist);
      const upper=new THREE.Group(); upper.position.y=1.14; visitor.add(upper);
      const maleCoatProfile=new THREE.SplineCurve([
        new THREE.Vector2(.36,-.41),
        new THREE.Vector2(.35,-.24),
        new THREE.Vector2(.33,.10),
        new THREE.Vector2(.345,.29),
        new THREE.Vector2(.325,.355),
        new THREE.Vector2(.29,.395),
        new THREE.Vector2(.24,.41),
        new THREE.Vector2(.12,.43),
        new THREE.Vector2(0,.44),
      ]);
      const maleCoatGeometry=new THREE.LatheGeometry([
        new THREE.Vector2(0,-.41),...maleCoatProfile.getPoints(96),
      ],64);
      const torso=new THREE.Mesh(maleCoatGeometry,coat); torso.position.y=.41; torso.scale.z=.72; torso.castShadow=true; upper.add(torso);
      const chest=new THREE.Mesh(new THREE.SphereGeometry(.37,24,16),coat); chest.position.y=.77; chest.scale.set(.97,.32,.69); chest.visible=false; upper.add(chest);
      const neck=new THREE.Mesh(new THREE.CylinderGeometry(.105,.12,.12,10),skin); neck.position.y=.955; upper.add(neck);
      const headPartsStart=upper.children.length;
      const head=new THREE.Mesh(new THREE.SphereGeometry(.24,18,14),skin); head.position.y=1.27; head.scale.set(.92,1.1,.86); head.castShadow=true; upper.add(head);
      // Cover the crown above the skin sphere, including its front-facing silhouette.
      const hair=new THREE.Mesh(new THREE.SphereGeometry(.255,24,18),mat(0x222826,.96)); hair.position.set(0,1.405,.005); hair.scale.set(.96,.73,.92); hair.castShadow=true; upper.add(hair);
      // Local -Z is the face; +Z is the back seen while approaching the stone.
      const backHair=new THREE.Mesh(new THREE.SphereGeometry(.244,18,14,0,Math.PI),hair.material);
      backHair.position.set(0,1.28,0); backHair.scale.set(.94,1.06,.9); upper.add(backHair);
      const shirt=mat(0xc5c8be,.96);
      const shirtFront=new THREE.Mesh(new THREE.BoxGeometry(.125,.24,.025),shirt);
      shirtFront.position.set(0,.76,-.255); upper.add(shirtFront);
      const coatSeam=new THREE.Mesh(new THREE.BoxGeometry(.018,.58,.018),mat(0x252e2c,.96));
      coatSeam.position.set(0,.34,-.251); upper.add(coatSeam);
      for(let i=0;i<3;i++) {
        const button=new THREE.Mesh(new THREE.SphereGeometry(.023,8,6),shoes);
        button.position.set(.055,.49-i*.16,-.265); upper.add(button);
      }
      const backSeam=new THREE.Mesh(new THREE.BoxGeometry(.012,.65,.012),mat(0x46514e,.96));
      backSeam.position.set(0,.43,.261); upper.add(backSeam);
      [-1,1].forEach(side=>{
        const ear=new THREE.Mesh(new THREE.SphereGeometry(.055,10,8),skin); ear.position.set(side*.223,1.265,0); ear.scale.set(.45,.9,.55); upper.add(ear);
      });
      // Draw a coherent, restrained face on the front hemisphere only.
      const faceCanvas=document.createElement("canvas"); faceCanvas.width=512; faceCanvas.height=512;
      const faceCtx=faceCanvas.getContext("2d")!;
      faceCtx.fillStyle="#b58d73"; faceCtx.fillRect(0,0,512,512);
      const faceTone=faceCtx.createRadialGradient(256,260,35,256,260,270);
      faceTone.addColorStop(0,"#c7a187"); faceTone.addColorStop(1,"#b58d73");
      faceCtx.fillStyle=faceTone; faceCtx.fillRect(0,0,512,512);
      faceCtx.lineCap="round";
      [190,322].forEach(x=>{
        faceCtx.save(); faceCtx.translate(x,235); faceCtx.scale(1.15,1.15); faceCtx.translate(-x,-235);
        faceCtx.strokeStyle="#302a26"; faceCtx.lineWidth=12;
        faceCtx.beginPath(); faceCtx.moveTo(x-29,205); faceCtx.quadraticCurveTo(x,195,x+28,205); faceCtx.stroke();
        faceCtx.fillStyle="#efe3d3"; faceCtx.beginPath(); faceCtx.ellipse(x,239,28,12,0,0,Math.PI*2); faceCtx.fill();
        faceCtx.fillStyle="#302b27"; faceCtx.beginPath(); faceCtx.ellipse(x,239,10,11,0,0,Math.PI*2); faceCtx.fill();
        faceCtx.fillStyle="#fff4df"; faceCtx.beginPath(); faceCtx.arc(x-3,235,2.5,0,Math.PI*2); faceCtx.fill();
        faceCtx.strokeStyle="#4b3b30"; faceCtx.lineWidth=5;
        faceCtx.beginPath(); faceCtx.moveTo(x-28,238); faceCtx.quadraticCurveTo(x,219,x+28,238); faceCtx.stroke();
        faceCtx.restore();
      });
      faceCtx.save(); faceCtx.translate(256,280); faceCtx.scale(1.12,1.12); faceCtx.translate(-256,-280);
      faceCtx.strokeStyle="#89634e"; faceCtx.lineWidth=6;
      faceCtx.beginPath(); faceCtx.moveTo(260,253); faceCtx.lineTo(245,292); faceCtx.quadraticCurveTo(256,307,274,293); faceCtx.stroke();
      faceCtx.fillStyle="#71503f";
      [245,270].forEach(x=>{ faceCtx.beginPath(); faceCtx.ellipse(x,296,5,3,0,0,Math.PI*2); faceCtx.fill(); });
      faceCtx.restore();
      faceCtx.save(); faceCtx.translate(256,335); faceCtx.scale(1.15,1.15); faceCtx.translate(-256,-335);
      faceCtx.fillStyle="#a06e60"; faceCtx.beginPath(); faceCtx.moveTo(222,333); faceCtx.quadraticCurveTo(244,320,256,328); faceCtx.quadraticCurveTo(268,320,290,333); faceCtx.quadraticCurveTo(256,354,222,333); faceCtx.fill();
      faceCtx.strokeStyle="#67483f"; faceCtx.lineWidth=5;
      faceCtx.beginPath(); faceCtx.moveTo(224,333); faceCtx.quadraticCurveTo(256,338,288,333); faceCtx.stroke();
      faceCtx.restore();
      const faceTexture=new THREE.CanvasTexture(faceCanvas); faceTexture.colorSpace=THREE.SRGBColorSpace;
      const faceSurface=new THREE.Mesh(new THREE.SphereGeometry(.242,40,32,Math.PI,Math.PI,.45,2.25),new THREE.MeshStandardMaterial({map:faceTexture,roughness:.98}));
      faceSurface.position.copy(head.position); faceSurface.scale.copy(head.scale); upper.add(faceSurface);
      const nose=new THREE.Mesh(new THREE.SphereGeometry(.038,16,12),skin); nose.position.set(0,1.245,-.216); nose.scale.set(.75,1.15,.95); upper.add(nose);
      // Lower the complete head together, keeping the face and hair aligned.
      upper.children.slice(headPartsStart).forEach((part:any)=>{
        if(part===head||part===hair||part===backHair||part===faceSurface||part===nose||part.geometry?.type==="SphereGeometry"&&part.material===skin) part.position.y-=.05;
      });
      [-1,1].forEach(side=>{
        const collar=new THREE.Mesh(new THREE.BoxGeometry(.085,.13,.025),shirt);
        collar.position.set(side*.056,.855,-.258); collar.rotation.z=side*.4; upper.add(collar);
      });
      const arms:any[]=[];
      [-1,1].forEach(side=>{
        const arm=new THREE.Group(); arm.position.set(side*.35,.78,0); upper.add(arm); arms.push(arm);
        const sleeve=new THREE.Mesh(new THREE.CapsuleGeometry(.125,.36,8,20),coat); sleeve.position.y=-.30; sleeve.castShadow=true; arm.add(sleeve);
        const cuff=new THREE.Mesh(new THREE.CylinderGeometry(.11,.105,.09,10),mat(0xb8b9ad,.9)); cuff.position.y=-.63; arm.add(cuff);
        const hand=new THREE.Mesh(new THREE.SphereGeometry(.095,10,8),skin); hand.position.y=-.72; arm.add(hand);
        arm.rotation.z=side*.16;
      });
      const heldFlower=createFlower("chrysanthemum",99); flowerLayer.remove(heldFlower); heldFlower.position.set(0,-.77,-.1); heldFlower.scale.setScalar(.8); arms[1].add(heldFlower);
      const placingFlower=createFlower("chrysanthemum",99); flowerLayer.remove(placingFlower); placingFlower.visible=false; scene.add(placingFlower);
      const flowerRelease=new THREE.Vector3();
      // Shorten the upper body above the waist without changing head or neck proportions.
      upper.children.forEach((part:any)=>{
        if(part!==torso) part.position.y-=.08;
      });
      // Both appearances share the same articulated rig and ceremony animation.
      const femaleHair=new THREE.Group(); upper.add(femaleHair); femaleHair.visible=false;
      // One continuous bob follows the back and sides, leaving the face open.
      const bobProfile=new THREE.SplineCurve([
        new THREE.Vector2(.215,.94),
        new THREE.Vector2(.245,.98),
        new THREE.Vector2(.255,1.08),
        new THREE.Vector2(.25,1.23),
        new THREE.Vector2(.225,1.34),
        new THREE.Vector2(.16,1.40),
      ]);
      // Extend the side panels toward the temples, keeping the rear profile intact.
      const bobGeometry=new THREE.LatheGeometry(bobProfile.getPoints(40),64,-2.16,4.32);
      const bobPositions=bobGeometry.attributes.position;
      for(let i=0;i<bobPositions.count;i++) {
        const x=bobPositions.getX(i), y=bobPositions.getY(i), z=bobPositions.getZ(i);
        const sideVolume=THREE.MathUtils.smoothstep(Math.abs(x),.15,.23)
          *(1-THREE.MathUtils.smoothstep(z,0,.12))
          *THREE.MathUtils.smoothstep(y,.94,1.08);
        const sideWeight=THREE.MathUtils.smoothstep(Math.abs(x),.15,.23);
        const rearSide=sideWeight*THREE.MathUtils.smoothstep(z,-.025,.06);
        const faceEdge=1-THREE.MathUtils.smoothstep(z,-.13,-.045);
        const ends=1-THREE.MathUtils.smoothstep(y,.95,1.13);
        // Thin the rear sides slightly; keep fullness above the jaw and taper the front ends.
        bobPositions.setX(i,x+Math.sign(x)*(.018*sideVolume-.020*rearSide-.023*faceEdge*ends));
        bobPositions.setY(i,y+.034*faceEdge*ends);
        bobPositions.setZ(i,z+.026*faceEdge*ends);
      }
      bobGeometry.computeVertexNormals();
      const bob=new THREE.Mesh(bobGeometry,hair.material);
      bob.scale.z=.88; bob.castShadow=true; femaleHair.add(bob);
      // A tapered sweep hugs the forehead instead of a separate oval hair block.
      const fringePath=new THREE.CatmullRomCurve3([
        new THREE.Vector3(-.18,1.285,-.145),
        new THREE.Vector3(-.10,1.295,-.195),
        new THREE.Vector3(.025,1.27,-.215),
        new THREE.Vector3(.135,1.235,-.177),
        new THREE.Vector3(.195,1.19,-.12),
      ]);
      const fringeVertices:number[]=[], fringeIndices:number[]=[];
      for(let i=0;i<=32;i++) {
        const t=i/32, point=fringePath.getPoint(t);
        const width=.008+.06*Math.sin(Math.PI*t);
        fringeVertices.push(point.x,point.y,point.z,point.x,point.y+width,point.z+.018);
        if(i<32){ const a=i*2; fringeIndices.push(a,a+1,a+2,a+1,a+3,a+2); }
      }
      const fringeGeometry=new THREE.BufferGeometry();
      fringeGeometry.setAttribute("position",new THREE.Float32BufferAttribute(fringeVertices,3));
      fringeGeometry.setIndex(fringeIndices); fringeGeometry.computeVertexNormals();
      const fringeMaterial=hair.material.clone(); fringeMaterial.side=THREE.DoubleSide;
      const fringe=new THREE.Mesh(fringeGeometry,fringeMaterial);
      fringe.castShadow=true; femaleHair.add(fringe);
      // The dress hem overlaps the bodice and follows its bowing pivot.
      const skirt=new THREE.Mesh(new THREE.CylinderGeometry(.285,.43,.65,24),coat);
      skirt.position.y=-.20; skirt.scale.set(1,.82,.77); skirt.castShadow=true; upper.add(skirt); skirt.visible=false;
      const femaleCanvas=document.createElement("canvas"); femaleCanvas.width=512; femaleCanvas.height=512;
      const femaleCtx=femaleCanvas.getContext("2d")!;
      femaleCtx.fillStyle="#c5a18a"; femaleCtx.fillRect(0,0,512,512);
      const complexion=femaleCtx.createRadialGradient(256,270,20,256,270,260);
      complexion.addColorStop(0,"#d5b59c"); complexion.addColorStop(1,"#c5a18a");
      femaleCtx.fillStyle=complexion; femaleCtx.fillRect(0,0,512,512); femaleCtx.lineCap="round";
      [187,325].forEach(x=>{
        const cheek=femaleCtx.createRadialGradient(x,291,3,x,291,38);
        cheek.addColorStop(0,"rgba(183,112,99,.16)"); cheek.addColorStop(1,"rgba(183,112,99,0)");
        femaleCtx.fillStyle=cheek; femaleCtx.fillRect(x-40,251,80,80);
        femaleCtx.save(); femaleCtx.translate(x,235); femaleCtx.scale(1.22,1.22); femaleCtx.translate(-x,-235);
        femaleCtx.strokeStyle="#634a3d"; femaleCtx.lineWidth=6;
        femaleCtx.beginPath(); femaleCtx.moveTo(x-29,203); femaleCtx.quadraticCurveTo(x,192,x+27,202); femaleCtx.stroke();
        femaleCtx.fillStyle="#f0e5d9";
        femaleCtx.beginPath(); femaleCtx.moveTo(x-31,239); femaleCtx.quadraticCurveTo(x,216,x+31,238); femaleCtx.quadraticCurveTo(x,257,x-31,239); femaleCtx.fill();
        femaleCtx.fillStyle="#71513c"; femaleCtx.beginPath(); femaleCtx.ellipse(x,238,13,14,0,0,Math.PI*2); femaleCtx.fill();
        femaleCtx.fillStyle="#302824"; femaleCtx.beginPath(); femaleCtx.ellipse(x,238,7,10,0,0,Math.PI*2); femaleCtx.fill();
        femaleCtx.fillStyle="#fff3e4"; femaleCtx.beginPath(); femaleCtx.arc(x-4,233,3.5,0,Math.PI*2); femaleCtx.fill();
        femaleCtx.strokeStyle="#554035"; femaleCtx.lineWidth=4;
        femaleCtx.beginPath(); femaleCtx.moveTo(x-31,239); femaleCtx.quadraticCurveTo(x,216,x+31,238); femaleCtx.stroke();
        femaleCtx.restore();
      });
      femaleCtx.save(); femaleCtx.translate(256,280); femaleCtx.scale(1.15,1.15); femaleCtx.translate(-256,-280);
      femaleCtx.strokeStyle="#a27e65"; femaleCtx.lineWidth=3;
      femaleCtx.beginPath(); femaleCtx.moveTo(253,261); femaleCtx.quadraticCurveTo(250,278,247,290); femaleCtx.quadraticCurveTo(257,299,267,291); femaleCtx.stroke();
      femaleCtx.restore();
      femaleCtx.save(); femaleCtx.translate(256,335); femaleCtx.scale(1.22,1.22); femaleCtx.translate(-256,-335);
      femaleCtx.fillStyle="#ae7970"; femaleCtx.beginPath(); femaleCtx.moveTo(225,334); femaleCtx.quadraticCurveTo(244,322,256,328); femaleCtx.quadraticCurveTo(268,322,287,334); femaleCtx.quadraticCurveTo(256,350,225,334); femaleCtx.fill();
      femaleCtx.strokeStyle="#855c52"; femaleCtx.lineWidth=3;
      femaleCtx.beginPath(); femaleCtx.moveTo(226,334); femaleCtx.quadraticCurveTo(256,338,286,334); femaleCtx.stroke();
      femaleCtx.restore();
      const femaleFaceTexture=new THREE.CanvasTexture(femaleCanvas); femaleFaceTexture.colorSpace=THREE.SRGBColorSpace;
      const maleTorsoGeometry=torso.geometry;
      // Rounded shoulders taper into the neckline instead of ending in a flat, broad rim.
      const shoulderProfile=new THREE.SplineCurve([
        new THREE.Vector2(.255,-.41),
        new THREE.Vector2(.26,-.32),
        new THREE.Vector2(.27,-.14),
        new THREE.Vector2(.29,.06),
        new THREE.Vector2(.305,.27),
        new THREE.Vector2(.30,.315),
        new THREE.Vector2(.265,.345),
        new THREE.Vector2(.19,.375),
        new THREE.Vector2(.115,.41),
        new THREE.Vector2(.065,.425),
        new THREE.Vector2(0,.43),
      ]);
      const femaleTorsoGeometry=new THREE.LatheGeometry([
        new THREE.Vector2(0,-.41),...shoulderProfile.getPoints(96),
      ],64);
      // A shallower upper chest keeps the rounded shoulders from looking domed.
      const bodicePositions=femaleTorsoGeometry.attributes.position;
      for(let i=0;i<bodicePositions.count;i++) {
        const height=bodicePositions.getY(i);
        const shoulderBlend=THREE.MathUtils.smoothstep(height,.18,.41);
        bodicePositions.setZ(i,bodicePositions.getZ(i)*(1-shoulderBlend*.22));
      }
      femaleTorsoGeometry.computeVertexNormals();
      const headWidth=head.scale.x, faceWidth=faceSurface.scale.x;
      const maleSleeveGeometry=arms[0].children[0].geometry;
      // Extend only the sleeve crown into the coat shoulder; keep the cuff in place.
      const shoulderPositions=maleSleeveGeometry.attributes.position;
      for(let i=0;i<shoulderPositions.count;i++) {
        const y=shoulderPositions.getY(i);
        const shoulderBlend=THREE.MathUtils.smoothstep(y,.04,.305);
        shoulderPositions.setY(i,y+.065*shoulderBlend);
        shoulderPositions.setX(i,shoulderPositions.getX(i)*(1+.10*shoulderBlend));
        shoulderPositions.setZ(i,shoulderPositions.getZ(i)*(1+.08*shoulderBlend));
      }
      maleSleeveGeometry.computeVertexNormals();
      // Keep the rounded shoulder height while extending the sleeve into the cuff.
      const femaleSleeveGeometry=new THREE.CapsuleGeometry(.115,.42,8,20);
      const relaxedSleeveGeometry=femaleSleeveGeometry.clone();
      const relaxedPositions=relaxedSleeveGeometry.attributes.position;
      for(let i=0;i<relaxedPositions.count;i++) {
        const bend=THREE.MathUtils.smoothstep(-relaxedPositions.getY(i),-.04,.32);
        relaxedPositions.setZ(i,relaxedPositions.getZ(i)-.16*bend);
      }
      relaxedSleeveGeometry.computeVertexNormals();
      const relaxedMaleSleeveGeometry=maleSleeveGeometry.clone();
      const maleSleevePositions=relaxedMaleSleeveGeometry.attributes.position;
      for(let i=0;i<maleSleevePositions.count;i++) {
        const bend=THREE.MathUtils.smoothstep(-maleSleevePositions.getY(i),-.04,.29);
        maleSleevePositions.setZ(i,maleSleevePositions.getZ(i)-.16*bend);
      }
      relaxedMaleSleeveGeometry.computeVertexNormals();
      // Flexible cloth bridges connect the bodice to the moving sleeve roots.
      const shoulderBridges=arms.map(()=>{
        const geometry=new THREE.BufferGeometry();
        geometry.setAttribute("position",new THREE.Float32BufferAttribute(new Float32Array(17*33*3),3));
        const indices:number[]=[];
        for(let ring=0;ring<16;ring++) for(let j=0;j<32;j++) {
          const a=ring*33+j,b=a+33;
          indices.push(a,b,a+1,b,b+1,a+1);
        }
        geometry.setIndex(indices);
        const material=coat.clone(); material.side=THREE.DoubleSide;
        const bridge=new THREE.Mesh(geometry,material); bridge.frustumCulled=false;
        upper.add(bridge); return bridge;
      });
      const sleeveRoot=new THREE.Vector3();
      let femaleVisitor=false;
      function chooseVisitor() {
        const female=Math.random()<.5;
        femaleVisitor=female;
        femaleHair.visible=female;
        skirt.visible=female;
        upper.position.y=female?1.24:1.14;
        upper.scale.y=female?.94:1;
        waist.position.y=female?1.21:1.11;
        waist.material=female?coat:trousers;
        torso.geometry=female?femaleTorsoGeometry:maleTorsoGeometry;
        faceSurface.material.map=female?femaleFaceTexture:faceTexture;
        faceSurface.material.needsUpdate=true;
        // Keep the neckline flush with the dress rather than a rounded shoulder bulge.
        chest.visible=false;
        chest.scale.set(.97,.32,.69);
        neck.scale.set(female?.88:1,1,female?.88:1);
        // Keep the joint inside the dress silhouette, including during a bow.
        waist.scale.set(female?.64:1,female?.32:.47,female?.48:.76);
        arms.forEach((arm:any,index:number)=>{
          arm.position.x=(index===0?-1:1)*(female?.265:.32);
          arm.position.y=female?.735:.72;
          arm.rotation.z=(index===0?-1:1)*(female?.14:.16);
          arm.scale.set(female?.88:1,1,female?.9:1);
          const sleeve=arm.children[0];
          sleeve.geometry=female?femaleSleeveGeometry:maleSleeveGeometry;
          sleeve.position.y=-.30;
        });
        legs.forEach((leg:any,index:number)=>{
          leg.position.x=(index===0?-1:1)*(female?.15:.18);
          leg.position.y=female?1.20:1.10;
          leg.scale.set(female?.87:1,female?1.24:1.13,female?.9:1);
        });
        coat.color.setHex(female?0x55505e:0x35403e);
        shoulderBridges.forEach((bridge:any)=>bridge.material.color.copy(coat.color));
        shirt.color.setHex(female?0xd4cec5:0xc5c8be);
        skin.color.setHex(female?0xc5a18a:0xb58d73);
        head.scale.x=headWidth*(female?.94:1);
        faceSurface.scale.x=faceWidth*(female?.94:1);
        nose.scale.set(female?.75:.75,female?1.20:1.15,female?.98:.95);
        visitor.scale.set(female?.96:1,female?.97:1,female?.96:1);
      }

      let flowerCount=0, mx=0, my=0, targetX=0, targetY=0, frame=0, last=performance.now();
      let renderedRevision=-1;
      let previousRitual="idle", approachX=-.7, tributeX=-.35, phaseStarted=performance.now(), flowerReleased=false;
      const exitStart=new THREE.Vector3();
      const previousWalkPosition=new THREE.Vector3();
      let walkPhase=0;
      // Short acceleration/deceleration, with a steady pace through most of the walk.
      const travelEase=(value:number)=>{
        const t=THREE.MathUtils.clamp(value,0,1), ramp=.15;
        if(t<ramp)return t*t/(2*ramp*(1-ramp));
        if(t>1-ramp)return 1-(1-t)*(1-t)/(2*ramp*(1-ramp));
        return (t-ramp/2)/(1-ramp);
      };
      const pointer=(event:PointerEvent)=>{ const rect=mount.getBoundingClientRect(); targetX=((event.clientX-rect.left)/rect.width-.5)*2; targetY=((event.clientY-rect.top)/rect.height-.5)*2; };
      mount.addEventListener("pointermove",pointer);
      const resize=()=>{ const w=mount.clientWidth,h=mount.clientHeight; renderer.setSize(w,h,false); camera.aspect=w/h; camera.updateProjectionMatrix(); }; resize(); const observer=new ResizeObserver(resize); observer.observe(mount);

      function animate(now:number){ if(disposed)return; const dt=Math.min((now-last)/1000,.05); last=now; mx+=(targetX-mx)*.035; my+=(targetY-my)*.035; camera.position.x=mx*2.3; camera.position.y=3.7-my*.55; camera.position.z=11.5-Math.abs(mx)*.25; camera.lookAt(0,1.7,-1.4);
        lake.material.opacity=.82+Math.sin(now*.0007)*.04;
        const current=stateRef.current; while(flowerCount<current.offerings.length){ const f=createFlower(current.offerings[flowerCount],flowerCount); f.scale.setScalar(.01); f.userData.born=now; flowerCount++; }
        if(renderedRevision!==current.revision) {
          if(renderedRevision>=0&&current.revision>0&&current.offerings.length===24) {
            const slot=(current.nextSlot+23)%24;
            const flower=flowerLayer.children[slot];
            styleFlower(flower,current.offerings[slot]);
            flower.userData.born=now;
          }
          renderedRevision=current.revision;
        }
        flowerLayer.children.forEach((f:any)=>{ if(f.userData.born){ const t=Math.min((now-f.userData.born)/650,1); f.scale.setScalar(offeredFlowerScale*Math.sin(t*Math.PI/2)); if(t===1)delete f.userData.born; } });
        if(current.ritual==="approach"&&previousRitual!=="approach") {
          chooseVisitor();
          approachX=(Math.random()-.5)*4.2;
          tributeX=(Math.random()-.5)*1.3;
          visitor.position.set(approachX,0,6.5);
          visitor.rotation.y=0;
          previousWalkPosition.copy(visitor.position); walkPhase=0;
          flowerReleased=false; placingFlower.visible=false;
        }
        if(previousRitual!==current.ritual) {
          phaseStarted=now;
          if(current.ritual==="complete") exitStart.copy(visitor.position);
        }
        previousRitual=current.ritual;
        const approaching=current.ritual==="approach";
        const destination=current.ritual==="place"?.85:1.45;
        if(current.ritual==="idle") { visitor.position.set(approachX,0,6.5); visitor.rotation.y=0; }
        else if(current.ritual==="complete") {
          const turnProgress=Math.min((now-phaseStarted)/900,1);
          visitor.rotation.y=Math.PI*turnProgress*turnProgress*(3-2*turnProgress);
          const exitProgress=Math.min(Math.max((now-phaseStarted-900)/3200,0),1);
          const ease=travelEase(exitProgress);
          visitor.position.set(exitStart.x+(approachX-exitStart.x)*ease,0,exitStart.z+(6.5-exitStart.z)*ease);
        } else if(approaching) {
          const progress=travelEase((now-phaseStarted)/5000);
          visitor.position.set(approachX+(tributeX-approachX)*progress,0,6.5+(1.45-6.5)*progress);
        } else {
          visitor.position.z+=(destination-visitor.position.z)*Math.min(dt*1.6,1);
          visitor.position.x+=(tributeX-visitor.position.x)*Math.min(dt*.85,1);
        }
        const travelActive=approaching||(current.ritual==="complete"&&now-phaseStarted>900);
        const distance=travelActive?visitor.position.distanceTo(previousWalkPosition):0;
        previousWalkPosition.copy(visitor.position);
        walkPhase+=distance*Math.PI*2/1.35;
        const strideBlend=THREE.MathUtils.smoothstep(distance/Math.max(dt,.001),.02,.85);
        const walking=travelActive&&strideBlend>.01;
        const gait=Math.sin(walkPhase)*.28*strideBlend;
        legs[0].rotation.x+=(gait-legs[0].rotation.x)*Math.min(dt*10,1);
        legs[1].rotation.x+=(-gait-legs[1].rotation.x)*Math.min(dt*10,1);
        const bowing=current.ritual==="bow"||current.ritual==="place";
        upper.rotation.x+=((bowing?-.52:0)-upper.rotation.x)*Math.min(dt*2.2,1);
        const placing=current.ritual==="place";
        const placeTime=now-phaseStarted;
        const femaleWalking=femaleVisitor&&walking;
        const returning=current.ritual==="complete";
        const gentleSwing=Math.sin(walkPhase)*.075*strideBlend;
        // Ease into the return gait after the turn, with arms opposite the stepping legs.
        const returnSwingBlend=returning?strideBlend:0;
        const returnSwing=Math.sin(walkPhase-.2)*.15*returnSwingBlend;
        const leftArmTarget=placing?.48:returning?.025-returnSwing:femaleWalking?-gentleSwing:walking?-.18:0;
        const rightArmTarget=placing?(placeTime<900?1.2:.2):returning?.025+returnSwing:femaleWalking?.12:walking?.15:0;
        const armFollow=returning?7:3;
        arms[0].rotation.x+=(leftArmTarget-arms[0].rotation.x)*Math.min(dt*armFollow,1);
        arms[1].rotation.x+=(rightArmTarget-arms[1].rotation.x)*Math.min(dt*armFollow,1);
        const shoulderSway=returning?Math.sin(walkPhase)*.025*returnSwingBlend:0;
        upper.rotation.y+=(shoulderSway-upper.rotation.y)*Math.min(dt*5,1);
          arms.forEach((arm:any,index:number)=>{
            const side=index===0?-1:1;
            // Let the wrists clear the flared dress without lifting the arms forward.
            const relaxedSway=Math.sin(walkPhase+index*Math.PI)*.018*returnSwingBlend;
            const outwardAngle=side*(returning?.17+relaxedSway:femaleWalking?.22:femaleVisitor?.14:.16);
            arm.rotation.z+=(outwardAngle-arm.rotation.z)*Math.min(dt*3,1);
            const relaxation=returning?THREE.MathUtils.smoothstep(now-phaseStarted,0,900):0;
            arm.children[0].geometry=femaleVisitor
              ?(returning?relaxedSleeveGeometry:femaleSleeveGeometry)
              :(returning?relaxedMaleSleeveGeometry:maleSleeveGeometry);
            const cuff=arm.children[1], hand=arm.children[2];
            const wristOffset=-.16*relaxation;
            cuff.position.z+=(wristOffset-cuff.position.z)*Math.min(dt*7,1);
            hand.position.z+=(wristOffset-.03*relaxation-hand.position.z)*Math.min(dt*7,1);
            cuff.rotation.x=.20*relaxation;
            hand.rotation.x=.24*relaxation;
          });
        shoulderBridges.forEach((bridge:any,index:number)=>{
          const side=index===0?-1:1, arm=arms[index];
          arm.updateMatrix();
          sleeveRoot.set(side*(femaleVisitor?.025:.055),femaleVisitor?-.10:-.075,0).applyMatrix4(arm.matrix);
          const positions=bridge.geometry.attributes.position;
          for(let ring=0;ring<=16;ring++) {
            const t=ring/16, ease=t*t*t*(t*(t*6-15)+10);
            const x=side*(femaleVisitor?.16:.20)*(1-t)+sleeveRoot.x*t;
            const y=(femaleVisitor?.64:.66)*(1-ease)+sleeveRoot.y*ease, z=sleeveRoot.z*ease;
            const ry=(femaleVisitor?.095:.12)*(1-ease)+(femaleVisitor?.085:.10)*ease;
            const rz=(femaleVisitor?.095:.13)*(1-ease)+(femaleVisitor?.08:.105)*ease;
            for(let j=0;j<=32;j++) {
              const angle=j/32*Math.PI*2;
              positions.setXYZ(ring*33+j,x,y+Math.cos(angle)*ry,z+Math.sin(angle)*rz);
            }
          }
          positions.needsUpdate=true; bridge.geometry.computeVertexNormals();
          // Duplicate vertices at the wrap must share normals to avoid a visible seam.
          const normals=bridge.geometry.attributes.normal;
          for(let ring=0;ring<=16;ring++) {
            const first=ring*33,last=first+32;
            const nx=normals.getX(first)+normals.getX(last);
            const ny=normals.getY(first)+normals.getY(last);
            const nz=normals.getZ(first)+normals.getZ(last);
            const length=Math.hypot(nx,ny,nz)||1;
            normals.setXYZ(first,nx/length,ny/length,nz/length);
            normals.setXYZ(last,nx/length,ny/length,nz/length);
          }
          normals.needsUpdate=true;
        });
        if(placing&&placeTime>420&&!flowerReleased) {
          visitor.updateMatrixWorld(true);
          heldFlower.getWorldPosition(flowerRelease);
          placingFlower.position.copy(flowerRelease);
          placingFlower.visible=true; flowerReleased=true;
        }
        if(placing&&flowerReleased) {
          const t=Math.min((placeTime-420)/850,1);
          const ease=t*t*(3-2*t);
          const destination=flowerPosition(current.nextSlot);
          placingFlower.position.set(
            flowerRelease.x+(destination.x-flowerRelease.x)*ease,
            flowerRelease.y+(destination.y-flowerRelease.y)*ease+.18*Math.sin(Math.PI*t),
            flowerRelease.z+(destination.z-flowerRelease.z)*ease
          );
          placingFlower.scale.setScalar(.8+(offeredFlowerScale-.8)*ease);
        }
        if(current.ritual==="complete"||current.ritual==="idle") placingFlower.visible=false;
        heldFlower.visible=!flowerReleased;
        visitor.visible=current.ritual!=="idle";
        [heldFlower,placingFlower].forEach(flower=>{
          if(flower.userData.kind!==current.selected)styleFlower(flower,current.selected);
        });
        renderer.render(scene,camera); frame=requestAnimationFrame(animate); }
      frame=requestAnimationFrame(animate);
      cleanup=()=>{ cancelAnimationFrame(frame); observer.disconnect(); mount.removeEventListener("pointermove",pointer); renderer.dispose(); renderer.domElement.remove(); maleTorsoGeometry.dispose(); femaleTorsoGeometry.dispose(); faceTexture.dispose(); femaleFaceTexture.dispose(); scene.traverse((o:any)=>{o.geometry?.dispose?.(); if(o.material){const list=Array.isArray(o.material)?o.material:[o.material]; list.forEach((m:any)=>{m.map?.dispose?.();m.dispose?.();});}}); };
    }
    void start();
    return()=>{disposed=true;cleanup();};
  },[]);

  return <div className="webgl-memorial" ref={mountRef}><div className="webgl-loading"><span />正在进入纪念园</div><div className="webgl-depth-hint">移动指针 · 环望纪念园</div></div>;
}
