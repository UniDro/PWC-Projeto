/**
 * Faz um pedido ajax ao url especificado e chama a função callback enviada.
 *
 * @param {string} url - Url para efetuar o pedido
 * @param {function} callback - A função a executar com os dados do pedido
 * @param {number|null} [limiter=null] - Parametro opcional, caso preenchido limita o numero de registos devolvidos. Exemplo: Limiter = 5 Retorna apenas 5 paises.
 *
 * @example
 * apiCall('https://api.example.com/data', function(data) {
 *     console.log(data);
 * }, 10);
 *
 * @returns {void} This function does not return a value.
 */
export function apiCall(url, callback, limiter = null) {
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',

        success: function(data){
            if(limiter != null){
                data = data.slice(0,limiter)
                console.log(data);
            }
            callback(data)
        },
        error: function(error){
            console.log('Não foi possivel fazer fetch dos dados');
        }
    })
}