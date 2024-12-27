"use client"
import './index.scss'
export default function StarSky() {
  return (
    <div style={{position:'fixed',top:0,left:0,width:'100%',height:'100%',zIndex:-1}}>
      <div className="layer1"></div>
      <div className="layer2"></div>
      <div className="layer3"></div>
      <div className="layer4"></div>
      {/* <div className="layer5"></div> */}
    </div>
  );
}
