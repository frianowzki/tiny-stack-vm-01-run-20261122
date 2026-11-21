import{readdirSync as R,readFileSync as F,writeFileSync as W,mkdirSync as K}from"node:fs";
const T="!2b%'+,0        *******&***&*** ***             AEEA!           &)              %%\"%";
const I=process.env.MAKEFUN_INPUT_DIR||"/input",O=process.env.MAKEFUN_OUTPUT_DIR||"/output";
for(const d of R(I)){
 const P=new Uint8Array(F(I+"/"+d+"/program.bin")),Q=new Uint8Array(F(I+"/"+d+"/input.bin"));
 const S=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),B=new Uint8Array(65536);
 let s=0,k=0,o=0,g=0,p=0,t=0,e=0;
 for(;;){
  if(t==1e6){e=10;break}
  if(p<0||p>=P.length){e=9;break}
  const y=P[p],v=T.charCodeAt(y)-33;
  if(y>83||v<0){e=5;break}
  const m=v>>4,u=(v>>2)&3,h=v&3;
  if(p+m>=P.length){e=9;break}
  t++;
  const n=p+1+m;
  if(s<u){e=2;break}
  if(s-u+h>256){e=3;break}
  p=n;
  if(y<8){
   if(y==0)break;
   else if(y==1)S[s++]=(P[n-1]<<24)>>24;
   else if(y==2)S[s++]=P[n-4]|P[n-3]<<8|P[n-2]<<16|P[n-1]<<24;
   else if(y==3)s--;
   else if(y==4)S[s++]=S[s-2];
   else if(y==5)[S[s-1],S[s-2]]=[S[s-2],S[s-1]];
   else if(y==6)S[s++]=S[s-3];
   else[S[s-3],S[s-2],S[s-1]]=[S[s-2],S[s-1],S[s-3]];
  }else if(y<35){
   if(y==23)S[s-1]=-S[s-1]|0;
   else if(y==27)S[s-1]=~S[s-1];
   else{
    const b=S[s-1],a=S[s-2];
    if(y>18&&y<23&&!b){e=4;break}
    s-=2;
    S[s++]=y==16?(a+b)|0:y==17?(a-b)|0:y==18?Math.imul(a,b):y==19?a==-2147483648&&b==-1?a:(a/b)|0:y==20?b==-1?0:a%b|0:y==21?Math.floor((a>>>0)/(b>>>0))|0:y==22?(a>>>0)%(b>>>0)|0:y==24?a&b:y==25?a|b:y==26?a^b:y==28?a<<(b&31):y==29?a>>(b&31):y==30?(a>>>(b&31))|0:y==32?a==b?1:0:y==33?a<b?1:0:(a>>>0)<(b>>>0)?1:0;
   }
  }else if(y<52){
   const l=((P[n-2]|P[n-1]<<8)<<16)>>16;
   if(y==48)p=n+l;
   else if(y==51){if(k==64){e=7;break}C[k++]=n;p=P[n-2]|P[n-1]<<8}
   else if((y==49)==(S[--s]==0))p=n+l;
  }else if(y==52){
   if(!k){e=8;break}
   p=C[--k];
  }else if(y==64){
   const a=S[s-1];
   if(a<0||a>255){e=6;break}
   S[s-1]=M[a];
  }else if(y==65){
   const a=S[s-1];
   if(a<0||a>255){e=6;break}
   s-=2;M[a]=S[s];
  }else if(y==80){
   const z=String(S[s-1]);
   if(o+z.length>65536){e=11;break}
   s--;
   for(const c of z)B[o++]=c.charCodeAt(0);
  }else if(y==81){
   if(o>65535){e=11;break}
   B[o++]=S[--s]&255;
  }else if(y==82){
   S[s++]=g<Q.length?Q[g++]:-1;
  }else{
   e=S[--s]&255;break;
  }
 }
 K(O+"/"+d,{recursive:true});
 W(O+"/"+d+"/stdout.bin",B.slice(0,o));
 W(O+"/"+d+"/exit.txt",e+"\n");
}
