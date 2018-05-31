/**
 * 公共js
 */

/**
 * 设置收藏
 * @param goodsId 商品ID
 * @param remove 取消收藏，不传则添加
 */
export function collection(goodsId,remove){
  if (typeof remove == undefined || remove==null){
    remove=false;
  }
}