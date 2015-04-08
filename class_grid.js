
//****************************************************************************************************

function classGrid() {

     //////////////////////////////////////////////////////////////////////////////////////////////////
     // Properties
     //////////////////////////////////////////////////////////////////////////////////////////////////

     this.caliber = "L"; // XXL, XL, L, M
     this.rowHeight = 0; // Specifies the height of the rows (px)
     this.fontSize = 0; // Specifies the size of the font (px)

     this.parentElement = document.body; // Reference to Parent Element for Grid

     this.divGrid = {}; // Object Grid

     this.isTitle = true;
     this.txtTitle = "myTitle"; // Txt in Title
     this.divTitle = {}; // Object Title
     this.divTitleTxt = {}; // Object Txt in Title

     this.isSearch = false;
     this.txtSearch = "Search"; // Txt in Search
     this.txtSearchCancel = "Cancel"; // Txt in SearchCancel
     this.divSearch = {}; // Object Search
     this.divSearchTxt = {}; // Object Txt in Search
     this.btnSearch = {}; // Object Image
     this.btnSearchCancel = {}; // Object Image
     this.btnSearchIn = "divGrid"; // Search in divGrid or in divTitle

     this.contentContainer = {}; // Object for Rows

     this.isHeaders = true;
     this.divHeaders = {};
     this.divHeadersTxt = [];

     this.divRows = []; // Objects Rows
     this.divCells = []; // Objects Cells

     this.isFooter = true;
     this.txtFooter = "myFooter"; // Txt in Footer
     this.divFooter = {}; // Object Footer
     this.divFooterTxt = {}; // Object Txt in Footer

     this.isClose = true;
     this.txtClose = "Close";
     this.btnClose = {}; // Object Close-button in Title

     this.isDel = true;
     this.txtDel = "Del";
     this.btnDel = {}; // Object Del-button in Title

     this.isEdit = true;
     this.txtEdit = "Edit";
     this.btnEdit = {}; // Object Edit-button in Title

     this.isCopy = true;
     this.txtCopy = "Copy";
     this.btnCopy = {}; // Object Copy-button in Title

     this.isAdd = true;
     this.txtAdd = "Add";
     this.btnAdd = {}; // Object Add-button in Title

     this.isNext = false;
     this.txtNext = "";
     this.btnNext = {}; // Object Next-button in Title

     this.isSelect = false;
     this.txtSelect = "";
     this.btnSelect = {}; // Object Select-button in Title

     this.isPrev = false;
     this.txtPrev = "";
     this.btnPrev = {}; // Object Prev-button in Title

     this.selectedRow = -1; // Selected Row

     this.tableName = ""; // The name of the Table being edited
     this.tableIDname = ""; // The name of the ID field

      // Specifies the Array of Objects-sources for the fields
     this.source = [ { "myField":"myField 1"}, { "myField":"myField 2"}, { "myField":"myField 3"} ];

     // An array of Fields
     this.fields = [ { "name":"myField", "caption":"myField", "type":"char", "width":"90%", "decimalPlaces":2 } ];

     // An array of References for Fields
     this.refs = { };
     this.refs.refNoData = [ { "refValue":"1", "refText":"N/D" } ];

     // Function names for Events
     this.RowOnClick = "";
     this.RowOnDblClick = "";

     //////////////////////////////////////////////////////////////////////////////////////////////////
     // Methods
     //////////////////////////////////////////////////////////////////////////////////////////////////

     this.show = function() {

         var obj = {};

         ////////// Caliber
         switch ( this.caliber ) {
             case "XXL" :
                 if ( this.rowHeight == 0 ) this.rowHeight = 64;
                 if ( this.fontSize == 0 ) this.fontSize = 36;
                 break;
             case "XL" :
                 if ( this.rowHeight == 0 ) this.rowHeight = 48;
                 if ( this.fontSize == 0 ) this.fontSize = 28;
                 break;
             case "L" :
                 if ( this.rowHeight == 0 ) this.rowHeight = 38;
                 if ( this.fontSize == 0 ) this.fontSize = 22;
                 break;
             case "M" :
             default :
                 if ( this.rowHeight == 0 ) this.rowHeight = 30;
                 if ( this.fontSize == 0 ) this.fontSize = 16;
                 break;
         }

         // Fields in "this.source" ( in 0-element )
         var i = 0;
         var fieldsInSource = [];
         for ( key in this.source[0] ) {
             fieldsInSource[i] = key;
             i++;
         }
         // Skipped properties
         for ( var iFld=0; iFld < this.fields.length; iFld++ ) {
             if ( !("name" in this.fields[iFld]) )          this.fields[iFld]["name"] = fieldsInSource[iFld];
             if ( !("caption" in this.fields[iFld]) )       this.fields[iFld]["caption"] = this.fields[iFld]["name"];
             if ( !("type" in this.fields[iFld]) )          this.fields[iFld]["type"] = "varchar";
             if ( !("width" in this.fields[iFld]) )         this.fields[iFld]["width"] = "10%";
             if ( !("decimalPlaces" in this.fields[iFld]) ) this.fields[iFld]["decimalPlaces"] = 2;
         }

         // divGrid
         {
             this.divGrid = document.createElement("div");
             obj = this.divGrid;
             obj.style.position = "relative";
             obj.style.boxSizing = "border-box";
             obj.style.width = "100%";
             obj.style.height = "100%";
             obj.style.minHeight = 3 * this.rowHeight;
             obj.style.border = "1px solid lightgrey";
             obj.style.cursor = "default";
             this.parentElement.appendChild(obj);
         }

         // divTitle
         if ( this.isTitle ) {
             // divTitle
             this.divTitle = document.createElement("div");
             obj = this.divTitle;
             obj.style.width = "100%";
             obj.style.height = this.rowHeight + "px";
             obj.style.background = "silver";
             obj.style.borderBottom = "1px solid silver";
             if ( this.btnSearchIn != "divTitle" ) {
                 // Prevent the selection of text
                 obj.onmousedown = function() { return false; }
                 obj.onselectstart = function() { return false; }
             }
             this.divGrid.appendChild(obj);
             // divTitleTxt
             this.divTitleTxt = document.createElement("div");
             obj = this.divTitleTxt;
             obj.style.position = "absolute";
             obj.style.lineHeight = this.rowHeight + "px";
             obj.style.paddingLeft = this.rowHeight/5 + "px";
             obj.style.paddingRight = this.rowHeight/5 + "px";
             obj.style.fontSize = 1.2 * this.fontSize + "px";
             obj.innerHTML = this.txtTitle;
             this.divTitle.appendChild(obj);
         }

         // divSearch
         if ( this.isSearch ) {
             // divSearch
             this.divSearch = document.createElement("div");
             obj = this.divSearch;
             obj.style.cssFloat = "left";
             obj.style.height = this.rowHeight + "px";
             obj.style.padding = 0 + "px";
             obj.style.background = "lightgrey";
             switch ( this.btnSearchIn ) {
                 case "divGrid" :
                     obj.style.borderTop = "1px solid lightgrey";
                     obj.style.width = "100%";
                     this.divGrid.appendChild(obj);
                     break;
                 case "divTitle" :
                     this.divTitle.appendChild(obj);
                     break;
             }
             // divSearchTxt
             this.divSearchTxt = document.createElement("input");
             obj = this.divSearchTxt;
             obj.type = "text";
             obj.style.width = "150px";
             obj.style.height = 0.8 * this.rowHeight + "px";
             obj.style.cssFloat = "left";
             obj.style.marginTop = 0.1 * this.rowHeight + "px";
             obj.style.marginLeft = this.rowHeight/10 + "px";
             obj.style.marginRight = this.rowHeight/10 + "px";
             obj.style.lineHeight = 0.8 * this.rowHeight + "px";
             obj.style.paddingLeft = this.rowHeight/10 + "px";
             obj.style.paddingRight = this.rowHeight/10 + "px";
             obj.style.fontSize = 0.9 * this.fontSize + "px";
             obj.style.background = "whitesmoke";
             obj.style.border = "1px solid darkgray";
             obj.placeholder = this.txtSearch;
             this.divSearch.appendChild(obj);
             obj.focus();
             obj.onkeypress = function( o ) { return function( event ) { if ( event.keyCode == 13 ) o.btnSearch.click(); } } ( this );
             // btnSearch
             this.btnSearch = document.createElement("img");
             obj = this.btnSearch;
             obj.style.width = this.rowHeight + "px";
             obj.style.height = this.rowHeight + "px";
             obj.style.cssFloat = "left";
             obj.style.cursor = "pointer";
             obj.title = this.txtSearch;
             obj.src = "images/class_grid_search.png";
             this.divSearch.appendChild(obj);
             // btnSearchCancel
             this.btnSearchCancel = document.createElement("img");
             obj = this.btnSearchCancel;
             obj.style.width = this.rowHeight + "px";
             obj.style.height = this.rowHeight + "px";
             obj.style.cssFloat = "left";
             obj.style.cursor = "pointer";
             obj.title = this.txtSearchCancel;
             obj.src = "images/class_grid_searchcancel.png";
             this.divSearch.appendChild(obj);

         }

         // divHeaders
         if ( this.isHeaders ) {
             // divHeaders
             this.divHeaders = document.createElement("div");
             obj = this.divHeaders;
             obj.style.width = "100%";
             obj.style.height = this.rowHeight + "px";
             obj.style.overflowX = "hidden";
             obj.style.overflowY = "scroll";
             obj.style.background = "lavender";
             obj.style.borderBottom = "1px solid lightgrey";
             // Prevent the selection of text
             obj.onmousedown = function() { return false; }
             obj.onselectstart = function() { return false; }
             this.divGrid.appendChild(obj);
             // Hide scrollbar Y
             obj = document.createElement("div");
             obj.style.position = "absolute";
             obj.style.width = this.divHeaders.offsetWidth - this.divHeaders.scrollWidth + 1 + "px";
             obj.style.height = this.rowHeight + "px";
             obj.style.right = "0";
             var top = 0;
             if ( this.isTitle ) { top += this.rowHeight + 1; }
             if ( this.isSearch && this.btnSearchIn == "divGrid" ) { top += this.rowHeight + 1; }
             obj.style.top = top + "px";
             obj.style.background = "lavender";
             this.divGrid.appendChild(obj);

             switch ( this.btnSearchIn ) {
                 case "divTitle" :
                     this.divHeaders.style.borderTop = "1px solid lightgrey";
                     break;
             }
         }

         // contentContainer ( Object for Rows )
         {
             this.contentContainer = document.createElement("div");
             obj = this.contentContainer;
             obj.style.position = "absolute";
             obj.style.width = "100%";
             var top = 0;
             if ( this.isTitle ) { top += this.rowHeight + 1; }
             if ( this.isSearch && this.btnSearchIn == "divGrid" ) { top += this.rowHeight + 1 - 1; }
             if ( this.isHeaders ) { top += this.rowHeight + 1 - 1; }
             obj.style.top = top + "px";
             var bottom = 0;
             if ( this.isFooter ) { bottom += this.rowHeight + 1; }
             obj.style.bottom = bottom + "px";
             obj.style.overflowX = "hidden";
             obj.style.overflowY = "scroll";
             obj.style.background = "whitesmoke";
             // Prevent the selection of text
             obj.onmousedown = function() { return false; }
             obj.onselectstart = function() { return false; }
             this.divGrid.appendChild(obj);
         }

         // divFooter
         if ( this.isFooter ) {
             this.divFooter = document.createElement("div");
             obj = this.divFooter;
             obj.style.position = "absolute";
             obj.style.width = "100%";
             obj.style.height = this.rowHeight + "px";
             obj.style.bottom = "0";
             obj.style.background = "lavender";
             obj.style.borderTop = "1px solid lightgrey";
             // Prevent the selection of text
             obj.onmousedown = function() { return false; }
             obj.onselectstart = function() { return false; }
             this.divGrid.appendChild(obj);
             // divFooterTxt
             this.divFooterTxt = document.createElement("div");
             obj = this.divFooterTxt;
             obj.style.position = "absolute";
             obj.style.lineHeight = this.rowHeight + "px";
             obj.style.paddingLeft = this.rowHeight/5 + "px";
             obj.style.paddingRight = this.rowHeight/5 + "px";
             obj.style.fontSize = 0.8 * this.fontSize + "px";
             obj.innerHTML = this.txtFooter;
             this.divFooter.appendChild(obj);
         }

         // Buttons in Title
         if ( this.isTitle ) {
             // btnClose
             if ( this.isClose ) this.btnClose = this.btnCreate( this.txtClose, "images/class_grid_close.png" );
             // btnDel
             if ( this.isDel ) this.btnDel = this.btnCreate( this.txtDel, "images/class_grid_del.png" );
             // btnEdit
             if ( this.isEdit ) this.btnEdit = this.btnCreate( this.txtEdit, "images/class_grid_edit.png" );
             // btnCopy
             if ( this.isCopy ) this.btnCopy = this.btnCreate( this.txtCopy, "images/class_grid_copy.png" );
             // btnAdd
             if ( this.isAdd ) this.btnAdd = this.btnCreate( this.txtAdd, "images/class_grid_add.png" );
             // btnNext
             if ( this.isNext ) this.btnNext = this.btnCreate( this.txtNext, "images/class_grid_next.png" );
             // btnSelect
             if ( this.isSelect ) this.btnSelect = this.btnCreate( this.txtSelect, "images/class_grid_select.png" );
             // btnPrev
             if ( this.isPrev ) this.btnPrev = this.btnCreate( this.txtPrev, "images/class_grid_prev.png" );
         }

         // divHeadersTxt
         this.createHeadersTxt();

         // divRows && divCells
         this.load();

     } // The end of show()

     //////////////////////////////////////////////////////////////////////////////////////////////////
     // Creating buttons
     //////////////////////////////////////////////////////////////////////////////////////////////////

     this.btnCreate = function( title, src ) {

         obj = document.createElement("img");
         obj.style.width = this.rowHeight + "px";
         obj.style.height = this.rowHeight + "px";
         obj.style.cssFloat = "right";
         obj.style.cursor = "pointer";
         obj.title = title;
         obj.src = src;
         // Objects Buttons in Title
         this.divTitle.appendChild(obj);
         return obj;

     }

     //////////////////////////////////////////////////////////////////////////////////////////////////
     // Creating HeadersTxt
     //////////////////////////////////////////////////////////////////////////////////////////////////

     this.createHeadersTxt = function() {

         if ( this.isHeaders ) {
             this.divHeaders.innerHTML = "";
             for ( var iFld=0; iFld < this.fields.length; iFld++ ) {
                 this.divHeadersTxt[iFld] = document.createElement("div");
                 obj = this.divHeadersTxt[iFld];
                 obj.style.boxSizing = "border-box";
                 obj.style.cssFloat = "left";
                 obj.style.overflow = "hidden";
                 obj.style.whiteSpace = "nowrap";
                 obj.style.width = this.fields[iFld].width;
                 obj.style.lineHeight = this.rowHeight + "px";
                 obj.style.paddingLeft = this.rowHeight/5 + "px";
                 obj.style.paddingRight = this.rowHeight/5 + "px";
                 obj.style.fontSize = this.fontSize + "px";
                 if ( this.fields[iFld].type == "decimal" ) obj.style.textAlign = "right";
                 obj.innerHTML = this.fields[iFld].caption;
                 this.divHeaders.appendChild(obj);
             }
         }

     }

     //////////////////////////////////////////////////////////////////////////////////////////////////
     // load
     //////////////////////////////////////////////////////////////////////////////////////////////////

     this.load = function() {

         for ( var iRow=0; iRow < this.source.length; iRow++ ) {
             // Drawing a one Row
             // Drawing a Cells
             this.createRowCells( iRow );
             // Drawing a Cells innerHTML
             for ( var iFld=0; iFld < this.fields.length; iFld++ ) {
                 var sbst = this.createInner( iRow, iFld );
                 this.divCells[iRow][ this.fields[iFld].name ].innerHTML = sbst;
             }
         }

     }

     //////////////////////////////////////////////////////////////////////////////////////////////////
     // reload
     //////////////////////////////////////////////////////////////////////////////////////////////////

     this.reload = function() {
         this.contentContainer.innerHTML = "";
         this.divRows = [];
         this.createHeadersTxt();
         this.load();
     }

     //////////////////////////////////////////////////////////////////////////////////////////////////
     // createRowCells
     //////////////////////////////////////////////////////////////////////////////////////////////////

     this.createRowCells = function( iRow ) {

         // Drawing a one Row
         this.divRows[iRow] = this.createRow( iRow );

         // RowOnClick
         this.divRows[iRow].onclick = function( obj, jRow ) {
             return function() {
                 obj.selectedRowSet( jRow );
                 if ( obj.RowOnClick !== "" ) { eval( obj.RowOnClick )( obj, jRow ); }
             }
         }( this, iRow );

         // RowOnDblClick
         this.divRows[iRow].ondblclick = function( obj, jRow ) {
             return function() {
                 if ( obj.RowOnDblClick !== "" ) { eval( obj.RowOnDblClick )( obj, jRow ); }
             }
         }( this, iRow );

         // Drawing a Cells
         this.divCells[iRow] = {}; // One object for one row
         for ( var iFld=0; iFld < this.fields.length; iFld++ ) {

             // createCell
             this.divCells[iRow][ this.fields[iFld].name ] = this.createCell( iRow, iFld );

             // cellSource Type
             switch ( this.fields[iFld].type ) {
                 case "url" :
                     this.divCells[iRow][ this.fields[iFld].name ].onclick = function( obj, iRow, iFld ) { return function() {
                         var url = obj.source[iRow][ obj.fields[iFld].name ];
                         window.open( url, '_blank' );
                     } } ( this, iRow, iFld );
                     break;
                 case "button" :
                     obj.onmouseover = function(){ this.style.backgroundColor = 'lightgrey' }
                     obj.onmouseout = function(){ this.style.backgroundColor = 'gainsboro' }
                     break;
                 default :
                     break;
             }

         }

     }

     //////////////////////////////////////////////////////////////////////////////////////////////////
     // Drawing a one Row
     //////////////////////////////////////////////////////////////////////////////////////////////////

     this.createRow = function() {

         obj = document.createElement("div");
         obj.style.width = "100%";
         obj.style.height = this.rowHeight - 1 + "px";
         obj.style.overflowX = "hidden";
         obj.style.overflowY = "hidden";
         obj.style.borderBottom = "1px solid lightgrey";
         obj.style.cursor = "pointer";
         this.contentContainer.appendChild(obj);
         return obj;

     }

     //////////////////////////////////////////////////////////////////////////////////////////////////
     // Drawing a one Cell in one Row
     //////////////////////////////////////////////////////////////////////////////////////////////////

     this.createCell = function( iRow, iFld ) {

         // Drawing a one Cell in Row
         obj = document.createElement("div");
         obj.style.boxSizing = "border-box";
         obj.style.cssFloat = "left";
         obj.style.overflow = "hidden";
         obj.style.whiteSpace = "nowrap";
         obj.style.width = this.fields[iFld].width;
         obj.style.height = this.rowHeight - 1 + "px";
         obj.style.lineHeight = this.rowHeight - 1 + "px";
         obj.style.paddingLeft = this.rowHeight/5 + "px";
         obj.style.paddingRight = this.rowHeight/5 + "px";
         obj.style.fontSize = 0.8 * this.fontSize + "px";
         this.divRows[iRow].appendChild(obj);

         // cellSource Type
         switch ( this.fields[iFld].type ) {
             case "url" :
                 obj.style.color = "royalblue";
                 obj.style.textDecoration = "underline";
                 break;
             case "button" :
                 obj.style.textAlign = "center";
                 obj.style.fontSize = this.fontSize + "px";
                 obj.style.background = "gainsboro";
                 obj.style.border = "1px solid whitesmoke";
                 break;
             default :
                 break;
         }

         return obj;

     }

     //////////////////////////////////////////////////////////////////////////////////////////////////
     // Drawing Inner of Cell
     //////////////////////////////////////////////////////////////////////////////////////////////////

     this.createInner = function( iRow, iFld ) {

         var cellSource = this.source[iRow][ this.fields[iFld].name ];

         // cellSource Type
         switch ( this.fields[iFld].type ) {
             case "decimal" :
                 var style = " text-align: right; width: 100%; ";
                 var decimalPlaces = this.fields[iFld].decimalPlaces;
                 cellSource = '<div style="' + style + '" >' + parseFloat(cellSource).toFixed(decimalPlaces) + '</div>';
                 break;
             case "checkbox" :
                 var width = 0.8 * this.rowHeight + "px"; // width == height
                 var height = 0.8 * this.rowHeight + "px"; // width == height
                 var top = 0.02 * this.rowHeight + "px";
                 var style = " width: " + width + ";" + " height: " + height + ";" + " top: " + top + ";";
                 if ( cellSource == 1 ) cellSource = '<input type="checkbox" onclick="return false" checked style="' + style + '" >';
                 else cellSource = '<input type="checkbox" onclick="return false" style="' + style + '" >';
                 break;
             case "date" :
                 if ( cellSource !== "" && cellSource !== null && typeof cellSource !== "undefined" ) {
                     var myYear = cellSource.substr(0,4);
                     var myMonth = cellSource.substr(5,2);
                     var myDay = cellSource.substr(8,2);
                     if ( myYear == "0000" && myMonth == "00" && myDay == "00" ) cellSource = "";
                     else cellSource = myDay + "." + myMonth + "." + myYear;
                 }
                 break;
             case "time" :
                 if ( cellSource !== "" && cellSource !== null && typeof cellSource !== "undefined" ) {
                     var myTime = cellSource.substr(0,5);
                     if ( myTime == "00:00" ) cellSource = "";
                     else cellSource = myTime;
                 }
                 break;
             case "button" :
                 cellSource = this.fields[iFld].caption;
                 break;
             default :
                 break;
         }

         return cellSource;

     }

     //////////////////////////////////////////////////////////////////////////////////////////////////
     // selectedRowSet
     //////////////////////////////////////////////////////////////////////////////////////////////////

     this.selectedRowSet = function( iRow ) {

         if ( this.selectedRow > -1 ) {
             this.divRows[ this.selectedRow ].style.background = "whitesmoke"; // UnSet
         }
         if ( iRow > -1 ) {
             this.divRows[ iRow ].style.background = "gainsboro"; // Set
         }
         this.selectedRow = iRow;

     }

     //////////////////////////////////////////////////////////////////////////////////////////////////
     // selectedRowTest
     //////////////////////////////////////////////////////////////////////////////////////////////////

     this.selectedRowTest = function( txtMessage ) {

         if ( this.selectedRow < 0 ) {

             var box = new classBox();
             o = box;
             o.txtTitle = "";
             o.txtMessage = txtMessage;
             o.txtButtons[0] = "OK";
             o.show();
             o.btnClose.onclick = function() { box.release(); }
             o.divButtons[0].onclick = function() { box.release(); }
             return false;

         }
         else {
             return true;
         }

     }

     //////////////////////////////////////////////////////////////////////////////////////////////////
     // Delete Row Quest
     //////////////////////////////////////////////////////////////////////////////////////////////////

     this.deleteRowQuest = function( txtMessage, answer0, answer1 ) {

         var box = new classBox();
         o = box;
         o.txtTitle = "";
         o.srcImage = "images/class_box_quest.png";
         o.txtMessage = txtMessage;
         o.txtButtons[0] = answer0;
         o.txtButtons[1] = answer1;
         o.show();
         return o;

     }

     //////////////////////////////////////////////////////////////////////////////////////////////////
     // Delete Row
     //////////////////////////////////////////////////////////////////////////////////////////////////

     this.deleteRow = function() {

         // Delete <div>
         o = this.divRows[ this.selectedRow ];
         o.parentNode.removeChild( o );

         // "splice" breaks the connection of the list with the elements of the array:
         // Delete element of source array
         //this.source.splice( this.selectedRow, 1 );
         // Delete from this.divRows
         //this.divRows.splice( this.selectedRow, 1 );
         this.source[ this.selectedRow ] = {};

         //
         this.selectedRowSet( -1 );
         box.release();

     }


     //////////////////////////////////////////////////////////////////////////////////////////////////
     // txtDelete
     //////////////////////////////////////////////////////////////////////////////////////////////////

     this.txtDelete = function() {

         var txtSQL = "DELETE FROM " + this.tableName;
         txtSQL += " WHERE " + this.tableIDname + " = " + this.source[ this.selectedRow ][ this.tableIDname ];
         return txtSQL;

     }

     //////////////////////////////////////////////////////////////////////////////////////////////////
     // Add Empty Row
     //////////////////////////////////////////////////////////////////////////////////////////////////

     this.addEmptyRow = function() {

         var iRow = this.divRows.length;

         this.createRowCells( iRow );

         // Select Empty Row
         this.selectedRowSet( iRow );

         // Scroll to bottom
         this.contentContainer.scrollTop = this.contentContainer.scrollHeight;

     }

     //////////////////////////////////////////////////////////////////////////////////////////////////
     // Refresh Row
     //////////////////////////////////////////////////////////////////////////////////////////////////

     this.refresh = function() {
         if ( this.selectedRow > -1 ) {
             for ( var iFld=0; iFld < this.fields.length; iFld++ ) {
                 var sbst = this.createInner( this.selectedRow, iFld );
                 this.divCells[ this.selectedRow ][ this.fields[iFld].name ].innerHTML = sbst;
             }
         }

     }

     //////////////////////////////////////////////////////////////////////////////////////////////////

}

//****************************************************************************************************
