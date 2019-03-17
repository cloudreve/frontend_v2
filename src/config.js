export const imgPreviewSuffix = ["bmp","png","gif","jpg","jpeg","svg","webp"];
export const msDocPreviewSuffix = ["ppt","pptx","pps","doc","docx","xlsx","xls"];
export const audioPreviewSuffix = ["mp3","ogg"];
export const videoPreviewSuffix = ["mp4"];
export const directOpenPreviewSuffix = ["pdf"];
export const editSuffix = ["md","html","sql","go","py","js","json","c","cpp","css","txt"];
export const mediaType = {
    audio:["mp3","flac","ape","wav","acc","ogg"],
    video:["mp4","flv","avi","wmv","mkv","rm","rmvb","mov","ogv"],
    image:["bmp","iff","png","gif","jpg","jpeg","psd","svg","webp"],
    pdf:["pdf"],
    word:["doc","docx"],
    ppt:["ppt","pptx"],
    excel:["xls","xlsx","csv"],
    text:["txt","md","html"],
    torrent:["torrent"],
    zip:["zip","gz","tar","rar","7z"],
    excute:["exe"],
    android:["apk"],
};
export const isPreviewable = name=>{
    let suffix = name.split(".").pop().toLowerCase();
    if(imgPreviewSuffix.indexOf(suffix)!==-1){
        return "img";
    }else if(msDocPreviewSuffix.indexOf(suffix)!==-1){
        return "msDoc";
    }else if(audioPreviewSuffix.indexOf(suffix)!==-1){
        return "audio";
    }else if(directOpenPreviewSuffix.indexOf(suffix)!==-1){
        return "open";
    }else if(videoPreviewSuffix.indexOf(suffix)!==-1){
        return "video";
    }else if(editSuffix.indexOf(suffix)!==-1){
        return "edit";
    }
    return false;
}
export const isTorrent = name=>{
    let suffix = name.split(".").pop().toLowerCase();
    if(mediaType.torrent.indexOf(suffix)!==-1){
        return true;
    }
    return false;
}
