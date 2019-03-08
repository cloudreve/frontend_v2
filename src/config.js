export const imgPreviewSuffix = ["bmp","png","gif","jpg","jpge","svg","webp"];
export const msDocPreviewSuffix = ["ppt","pptx","pps","doc","docx","xlsx","xls"];
export const audioPreviewSuffix = ["mp3","ogg"];
export const isPreviewable = name=>{
    let suffix = name.split(".").pop().toLowerCase();
    if(imgPreviewSuffix.indexOf(suffix)!==-1){
        return "img";
    }else if(msDocPreviewSuffix.indexOf(suffix)!==-1){
        return "msDoc";
    }else if(audioPreviewSuffix.indexOf(suffix)!==-1){
        return "audio";
    }
    return false;
}
export const mediaType = {
    audio:["mp3","flac","ape","wav","acc","ogg"],
    video:["mp4","flv","avi","wmv","mkv","rm","rmvb","mov","ogv"],
    image:["bmp","iff","png","gif","jpg","jpge","psd","svg","webp"],
    pdf:["pdf"],
    word:["doc","docx"],
    ppt:["ppt","pptx"],
    excel:["xls","xlsx","csv"],
    text:["txt","md","html"],
};