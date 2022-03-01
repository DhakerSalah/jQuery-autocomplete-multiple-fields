var SmartMultiFiled = (function(){
    var rowcount, html, addBtn, tableBody;

    addBtn = $("#addNew");
    rowcount = $("#autocomplete_table tbody tr").length+1;
    tableBody = $("#autocomplete_table tbody");


    function formHtml() {
        html = '<tr id="row_'+rowcount+'">';
        html += '<th id="delete_'+rowcount+'" scope="row" class="delete_row"><img src="./src/images/minus.svg" alt=""></th>';
        html += '<td>';
        html += '<input type="text" data-type="countryname" name="countryname[]" id="countryname_'+rowcount+'" class="form-control autocomplete_txt" autocomplete="off">';
        html += '</td>';
        html += '<td>';
        html += '<input type="text" data-type="countryno" name="countryno[]" id="countryno_'+rowcount+'" class="form-control autocomplete_txt" autocomplete="off">';
        html += '</td>';
        html += '<td>';
        html += '<input type="text" data-type="phone_code" name="phone_code[]" id="phone_code_'+rowcount+'" class="form-control autocomplete_txt" autocomplete="off">';
        html += '</td>';

        html += '<td>';
        html += '<input type="text" data-type="country_code" name="country_code[]" id="country_code_'+rowcount+'" class="form-control autocomplete_txt" autocomplete="off">';
        html += '</td>';
        html += '</tr>';
        rowcount++;
        return html;
    }
    function getFieldNo(type){
        var fieldNo;
        switch (type) {
            case 'countryname':
                fieldNo = 0;
                break;
            case 'countryno':
                fieldNo = 1;
                break;
            case 'phone_code':
                fieldNo = 2;
                break;
            case 'country_code':
                fieldNo = 3;
                break;
            default:
                break;
        }
        return fieldNo;
    }

    function handleAutocomplete() {
        var type, fieldNo, currentEle; 
        type = $(this).data('type');
        fieldNo = getFieldNo(type);
        currentEle = $(this);

        if(typeof fieldNo === 'undefined') {
            return false;
        }

        $(this).autocomplete({
            source: function( data, cb ) {	 
                $.ajax({
                    url:'ajax.php',
                    method: 'GET',
                    dataType: 'json',
                    data: {
                        name:  data.term,
                        fieldNo: fieldNo
                    },
                    success: function(res){
                        var result;
                        result = [
                            {
                                label: 'There is matching record found for '+data.term,
                                value: ''
                            }
                        ];

                        if (res.length) {
                            result = $.map(res, function(obj){
                                var arr = obj.split("|");
                                return {
                                    label: arr[fieldNo],
                                    value: arr[fieldNo],
                                    data : obj
                                };
                            });
                        }
                        cb(result);
                    }
                });
            },
            autoFocus: true,	      	
            minLength: 1,
            select: function( event, ui ) {
                var resArr, rowNo;
                
                
                rowNo = getId(currentEle);
                resArr = ui.item.data.split("|");	
                
            
                $('#countryname_'+rowNo).val(resArr[0]);
                $('#countryno_'+rowNo).val(resArr[1]);
                $('#phone_code_'+rowNo).val(resArr[2]);
                $('#country_code_'+rowNo).val(resArr[3]);
            }		      	
        });
    }

    function getId(element){
        var id, idArr;
        id = element.attr('id');
        idArr = id.split("_");
        return idArr[idArr.length - 1];
    }

    function addNewRow() { 
        tableBody.append( formHtml() );
    }

    function deleteRow() { 
        var currentEle, rowNo;
        currentEle = $(this);
        rowNo = getId(currentEle);
        $("#row_"+rowNo).remove();
    }

    function registerEvents() {
        addBtn.on("click", addNewRow);
        $(document).on('click', '.delete_row', deleteRow);
        //register autocomplete events
        $(document).on('focus','.autocomplete_txt', handleAutocomplete);
    }
    function init() {
        registerEvents();
    }

    return {
        init: init
    };
})();



$(document).ready(function(){
    SmartMultiFiled.init();
});