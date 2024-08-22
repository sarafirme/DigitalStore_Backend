
function verify(objeto){
    let result = true;
    objeto.map(item => {
        item == '' || item == null ? result=false : result;
        // console.log(result)
    })
    return result
}

module.exports = verify;