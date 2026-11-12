"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef } from "react";
import * as ThreeVendor from "./vendor/three.module.min.js";

const THREE: any = ThreeVendor;

type Props = { ritual: string; selected: string; offerings: string[] };

export default function Memorial3D({ ritual, selected, offerings }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ ritual, selected, offerings });
  useEffect(() => { stateRef.current = { ritual, selected, offerings }; }, [ritual, selected, offerings]);

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
        inscriptionCtx.font="600 44px SimSun"; inscriptionCtx.fillStyle="#222a27"; const words=index===0?["忠","诚","如","山"]:["担","当","如","铁"];
        words.forEach((word,row)=>inscriptionCtx.fillText(word,96,112+row*82));
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
      ctx.font="600 42px SimSun"; ctx.fillText("反 诈 英 雄",384,250); ctx.font="700 120px SimSun"; ctx.fillText("徽  剑",384,430); ctx.font="500 44px SimSun"; ctx.fillText("吴  恺",384,510); ctx.fillRect(330,565,108,5); ctx.font="500 39px SimSun"; ctx.fillText("以微光刺破黑暗",384,680); ctx.fillText("以孤勇守护人间",384,738); ctx.font="500 34px SimSun"; ctx.fillText("永远怀念",384,840);
      const labelTexture=new THREE.CanvasTexture(labelCanvas); labelTexture.colorSpace=THREE.SRGBColorSpace;
      const label=new THREE.Mesh(new THREE.PlaneGeometry(2.15,2.88),new THREE.MeshBasicMaterial({map:labelTexture,transparent:true,depthWrite:false})); label.position.set(0,2.37,.66); label.renderOrder=5; grave.add(label);

      const flowerLayer = new THREE.Group(); scene.add(flowerLayer);
      const flowerColors:Record<string,number>={chrysanthemum:0xf7f0d7,lily:0xfff7df,sunflower:0xe8ad22};
      function createFlower(id:string,index:number){ const g=new THREE.Group(); const stem=new THREE.Mesh(new THREE.CylinderGeometry(.018,.024,.55,6),mat(0x315c37,.9)); stem.position.y=.28; g.add(stem); const center=new THREE.Mesh(new THREE.SphereGeometry(.09,10,8),mat(id==="sunflower"?0x694317:0xd6b857,.7)); center.position.y=.62; g.add(center); for(let p=0;p<8;p++){ const petal=new THREE.Mesh(new THREE.SphereGeometry(.10,8,6),mat(flowerColors[id]??0xffffff,.65)); const a=p/8*Math.PI*2; petal.scale.set(.55,1.1,.35); petal.position.set(Math.cos(a)*.14,.62+Math.sin(a)*.14,0); petal.rotation.z=-a; g.add(petal); } const row=Math.floor(index/8); g.position.set(((index%8)-3.5)*.34,.24+row*.02,-1.65+row*.34); g.rotation.z=((index%3)-1)*.12; g.rotation.x=-.18; g.scale.setScalar(1.05); flowerLayer.add(g); return g; }

      const visitor=new THREE.Group(); visitor.position.set(-.7,0,6.5); visitor.visible=false; scene.add(visitor);
      const coat=mat(0x35403e,.96), trousers=mat(0x252c2b,.98), skin=mat(0xb58d73,.95), shoes=mat(0x1b201f,.96);
      const legs:any[]=[];
      [-.18,.18].forEach((x,index)=>{
        const leg=new THREE.Group(); leg.position.set(x,.98,0); visitor.add(leg); legs.push(leg);
        const thigh=new THREE.Mesh(new THREE.CylinderGeometry(.145,.13,.48,10),trousers); thigh.position.y=-.24; thigh.castShadow=true; leg.add(thigh);
        const knee=new THREE.Mesh(new THREE.SphereGeometry(.13,10,8),trousers); knee.position.y=-.48; leg.add(knee);
        const calf=new THREE.Mesh(new THREE.CylinderGeometry(.12,.095,.43,10),trousers); calf.position.y=-.69; calf.castShadow=true; leg.add(calf);
        const shoe=new THREE.Mesh(new THREE.BoxGeometry(.23,.14,.38),shoes); shoe.position.set(0,-.93,-.09); shoe.castShadow=true; leg.add(shoe);
        leg.rotation.x=index===0?.04:-.04;
      });
      const upper=new THREE.Group(); upper.position.y=1.02; visitor.add(upper);
      const torso=new THREE.Mesh(new THREE.CylinderGeometry(.32,.36,.9,14),coat); torso.position.y=.45; torso.scale.z=.72; torso.castShadow=true; upper.add(torso);
      const chest=new THREE.Mesh(new THREE.SphereGeometry(.37,14,10),coat); chest.position.y=.77; chest.scale.set(1,.36,.72); chest.castShadow=true; upper.add(chest);
      const neck=new THREE.Mesh(new THREE.CylinderGeometry(.105,.12,.17,10),skin); neck.position.y=.98; upper.add(neck);
      const head=new THREE.Mesh(new THREE.SphereGeometry(.24,18,14),skin); head.position.y=1.27; head.scale.set(.92,1.1,.86); head.castShadow=true; upper.add(head);
      const hair=new THREE.Mesh(new THREE.SphereGeometry(.247,18,12),mat(0x222826,.96)); hair.position.set(0,1.38,.015); hair.scale.set(.96,.6,.9); upper.add(hair);
      const facialDark=mat(0x35312e,.96), eyeWhite=mat(0xd8cfc0,.96), lipColor=mat(0x946d62,.96);
      [-1,1].forEach(side=>{
        const x=side*.085;
        const ear=new THREE.Mesh(new THREE.SphereGeometry(.055,10,8),skin); ear.position.set(side*.223,1.265,0); ear.scale.set(.45,.9,.55); upper.add(ear);
        const eye=new THREE.Mesh(new THREE.SphereGeometry(.032,10,8),eyeWhite); eye.position.set(x,1.292,-.195); eye.scale.set(1,.38,.4); upper.add(eye);
        const iris=new THREE.Mesh(new THREE.SphereGeometry(.014,8,6),facialDark); iris.position.set(x,1.29,-.211); upper.add(iris);
        const brow=new THREE.Mesh(new THREE.BoxGeometry(.08,.012,.01),facialDark); brow.position.set(x,1.344,-.192); brow.rotation.z=side*.08; upper.add(brow);
      });
      const nose=new THREE.Mesh(new THREE.SphereGeometry(.036,10,8),skin); nose.position.set(0,1.229,-.215); nose.scale.set(.65,1.1,.7); upper.add(nose);
      const mouth=new THREE.Mesh(new THREE.SphereGeometry(.048,10,6),lipColor); mouth.position.set(0,1.147,-.179); mouth.scale.set(1,.12,.24); upper.add(mouth);
      const arms:any[]=[];
      [-1,1].forEach(side=>{
        const arm=new THREE.Group(); arm.position.set(side*.35,.78,0); upper.add(arm); arms.push(arm);
        const sleeve=new THREE.Mesh(new THREE.CylinderGeometry(.13,.105,.58,10),coat); sleeve.position.y=-.31; sleeve.castShadow=true; arm.add(sleeve);
        const cuff=new THREE.Mesh(new THREE.CylinderGeometry(.11,.105,.09,10),mat(0xb8b9ad,.9)); cuff.position.y=-.63; arm.add(cuff);
        const hand=new THREE.Mesh(new THREE.SphereGeometry(.095,10,8),skin); hand.position.y=-.72; arm.add(hand);
        arm.rotation.z=side*.16;
      });
      const heldFlower=createFlower("chrysanthemum",99); flowerLayer.remove(heldFlower); heldFlower.position.set(0,-.77,-.1); heldFlower.scale.setScalar(.8); arms[1].add(heldFlower);
      const placingFlower=createFlower("chrysanthemum",99); flowerLayer.remove(placingFlower); placingFlower.visible=false; scene.add(placingFlower);
      const flowerRelease=new THREE.Vector3();

      let flowerCount=0, mx=0, my=0, targetX=0, targetY=0, frame=0, last=performance.now();
      let previousRitual="idle", approachX=-.7, tributeX=-.35, phaseStarted=performance.now(), flowerReleased=false;
      const exitStart=new THREE.Vector3();
      const pointer=(event:PointerEvent)=>{ const rect=mount.getBoundingClientRect(); targetX=((event.clientX-rect.left)/rect.width-.5)*2; targetY=((event.clientY-rect.top)/rect.height-.5)*2; };
      mount.addEventListener("pointermove",pointer);
      const resize=()=>{ const w=mount.clientWidth,h=mount.clientHeight; renderer.setSize(w,h,false); camera.aspect=w/h; camera.updateProjectionMatrix(); }; resize(); const observer=new ResizeObserver(resize); observer.observe(mount);

      function animate(now:number){ if(disposed)return; const dt=Math.min((now-last)/1000,.05); last=now; mx+=(targetX-mx)*.035; my+=(targetY-my)*.035; camera.position.x=mx*2.3; camera.position.y=3.7-my*.55; camera.position.z=11.5-Math.abs(mx)*.25; camera.lookAt(0,1.7,-1.4);
        lake.material.opacity=.82+Math.sin(now*.0007)*.04;
        const current=stateRef.current; while(flowerCount<current.offerings.length){ const f=createFlower(current.offerings[flowerCount],flowerCount); f.scale.setScalar(.01); f.userData.born=now; flowerCount++; }
        flowerLayer.children.forEach((f:any)=>{ if(f.userData.born){ const t=Math.min((now-f.userData.born)/650,1); f.scale.setScalar(1.05*Math.sin(t*Math.PI/2)); if(t===1)delete f.userData.born; } });
        if(current.ritual==="approach"&&previousRitual!=="approach") {
          approachX=(Math.random()-.5)*4.2;
          tributeX=(Math.random()-.5)*1.3;
          visitor.position.set(approachX,0,6.5);
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
          const exitProgress=Math.min(Math.max((now-phaseStarted-350)/1550,0),1);
          const ease=exitProgress*exitProgress*(3-2*exitProgress);
          visitor.position.set(exitStart.x+(approachX-exitStart.x)*ease,0,exitStart.z+(6.5-exitStart.z)*ease);
          visitor.rotation.y+=((Math.PI)-visitor.rotation.y)*Math.min(dt*5,1);
        } else {
          visitor.position.z+=(destination-visitor.position.z)*Math.min(dt*(approaching?1.05:1.6),1);
          visitor.position.x+=(tributeX-visitor.position.x)*Math.min(dt*.85,1);
        }
        const walking=current.ritual==="approach"||(current.ritual==="complete"&&now-phaseStarted>350);
        const gait=walking?Math.sin(now*.006)*.24:0;
        legs[0].rotation.x+=(gait-legs[0].rotation.x)*Math.min(dt*5,1);
        legs[1].rotation.x+=(-gait-legs[1].rotation.x)*Math.min(dt*5,1);
        const bowing=current.ritual==="bow"||current.ritual==="place";
        upper.rotation.x+=((bowing?-.52:0)-upper.rotation.x)*Math.min(dt*2.2,1);
        const placing=current.ritual==="place";
        const placeTime=now-phaseStarted;
        arms[0].rotation.x+=((placing?.48:walking?-.18:0)-arms[0].rotation.x)*Math.min(dt*3,1);
        arms[1].rotation.x+=((placing?(placeTime<900?1.2:.2):walking?.15:0)-arms[1].rotation.x)*Math.min(dt*3,1);
        if(placing&&placeTime>420&&!flowerReleased) {
          visitor.updateMatrixWorld(true);
          heldFlower.getWorldPosition(flowerRelease);
          placingFlower.position.copy(flowerRelease);
          placingFlower.visible=true; flowerReleased=true;
        }
        if(placing&&flowerReleased) {
          const t=Math.min((placeTime-420)/850,1);
          const ease=t*t*(3-2*t);
          placingFlower.position.set(
            flowerRelease.x+(tributeX+.42-flowerRelease.x)*ease,
            flowerRelease.y+(.24-flowerRelease.y)*ease+.18*Math.sin(Math.PI*t),
            flowerRelease.z+(-1.3-flowerRelease.z)*ease
          );
          placingFlower.scale.setScalar(.8+.2*ease);
        }
        if(current.ritual==="complete"||current.ritual==="idle") placingFlower.visible=false;
        heldFlower.visible=!flowerReleased;
        visitor.visible=current.ritual!=="idle";
        const color=flowerColors[current.selected]??0xffffff; [heldFlower,placingFlower].forEach(flower=>flower.children.forEach((child:any,index:number)=>{ if(index>1)child.material.color.setHex(color); }));
        renderer.render(scene,camera); frame=requestAnimationFrame(animate); }
      frame=requestAnimationFrame(animate);
      cleanup=()=>{ cancelAnimationFrame(frame); observer.disconnect(); mount.removeEventListener("pointermove",pointer); renderer.dispose(); renderer.domElement.remove(); scene.traverse((o:any)=>{o.geometry?.dispose?.(); if(o.material){const list=Array.isArray(o.material)?o.material:[o.material]; list.forEach((m:any)=>{m.map?.dispose?.();m.dispose?.();});}}); };
    }
    void start();
    return()=>{disposed=true;cleanup();};
  },[]);

  return <div className="webgl-memorial" ref={mountRef}><div className="webgl-loading"><span />正在进入纪念园</div><div className="webgl-depth-hint">移动指针 · 环望纪念园</div></div>;
}
