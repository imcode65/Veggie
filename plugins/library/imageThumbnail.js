export const getImageThumbnailPath = function(imageStoragePath){
  let splitArray = imageStoragePath.split('.')
  splitArray[0] = `${splitArray[0]}_600x600`
  return splitArray.join('.')
}

export const getImageThumbnailPaths = function(imageStoragePaths){
  return imageStoragePaths.map((path) => {
    if (!path) {
      return ''
    }
    let splitArray = path.split('.')
    splitArray[0] = `${splitArray[0]}_600x600`
    return splitArray.join('.')
  })
}

export const getImageOriginalPath = function(imageThumbnailPath){
  let splitArray = imageThumbnailPath.split('_600x600')
  // pathに「_」が入っていない場合は元々サムネイルでない
  // console.log(imageThumbnailPath);
  if(splitArray.length == 1) return imageThumbnailPath
  return splitArray[0] + splitArray[1]
}