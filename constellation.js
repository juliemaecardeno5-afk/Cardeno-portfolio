function initConstellations(){
    document.querySelectorAll(".constellation").forEach(cont=>{
      const canvas=document.createElement("canvas");
      canvas.width=cont.clientWidth;
      canvas.height=cont.clientHeight;
      cont.innerHTML="";
      cont.appendChild(canvas);
      const ctx=canvas.getContext("2d");
      for(let i=0;i<30;i++){
        const x=Math.random()*canvas.width;
        const y=Math.random()*canvas.height;
        ctx.fillStyle="#fff";
        ctx.fillRect(x,y,2,2);
        if(i%5===0){
          const x2=Math.random()*canvas.width;
          const y2=Math.random()*canvas.height;
          ctx.beginPath();
          ctx.moveTo(x,y);
          ctx.lineTo(x2,y2);
          ctx.strokeStyle="#aaa";
          ctx.stroke();
        }
      }
    });
  }
  