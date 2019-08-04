function getItem(x,y,color){
   var tdStr = ''
    for(var i=0;i<8;i++){
        tdStr+='<div class="item" data-x='+i+'></div>'

    }
    var trStr = ''
    for(var j=0;j<8;j++){
        trStr += '<div data-y='+j+'>'+tdStr+'</div>'
    }
    $('.box').html(trStr)
    var whitePieces = '<div class="Whiteqizi"></div>'
    var blackPieces = '<div class="blackqizi"></div>'
    $('[data-y='+y+']').find('[data-x = '+x+']').append(color)
    // $('[data-y=3]').find('[data-x = 4]').append(blackPieces)
    // $('[data-y=4]').find('[data-x = 3]').append(blackPieces)
    // $('[data-y=4]').find('[data-x = 4]').append(whitePieces)
}
getItem(3,4,'whitePieces')      


