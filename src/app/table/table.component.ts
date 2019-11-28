import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
declare global {
  interface Array<T> {
    sum(prop: any);
  }
}
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  arr:Array<any> = [];
  personList:any =  [];
  dropdownList = [];
  current_date : any;
  isDisabled:boolean = true;
  el:any;
  Itemsselected = [];
  pp:boolean = true;
  selectedItems:Array<any> = [];
  dropdownSettings: IDropdownSettings;
  menu_selected:any;
  countries = [
    {
      'FY':'Fiscal Year'
    },
    {
      'session':'Fiscal Year - 2018-19',
      'FY':'2018-19'
     },
     {
      'session':'Fiscal Year - 2019-20',
      'FY':'2019-20'
     },
  ]
  
  get_updated_values(){
    var consumed_values=[];
    var Changed_values=[];
    this.el = document.querySelectorAll('#id');//for thead
    for(var i=0;i<this.el.length;i++)
    {
     if( this.el[i].style.display == '' || this.el[i].style.display == 'table-cell' || this.el[i].style.display == 'none'){
       console.log(this.el[i])
      var els = this.el[i].innerText
      console.log(els)
      consumed_values.push(els.split("\n"))
      }
      
    }
   for(var i =0;i<consumed_values.length;i++){
     var payload = {
      'Import_qty_for_P1': consumed_values[i][0],
      'Import_qty_for_P2': consumed_values[i][1],
      'alumina_lanjigarh_supply_p1':  consumed_values[i][2] ,
      'alumina_lanjigarh_supply_p2':  consumed_values[i][3],
      'alumina_req_P1':  consumed_values[i][4],
      'alumina_req_P2': consumed_values[i][5],
      'fiscalyear': this.menu_selected,
      'import_qty': this.menu_selected,
      'month': i+4,
      'total_alumina_req': "0",
      'total_lanjigarh_supply': "0"
     }
     Changed_values.push(payload)
   }
   console.log(Changed_values) //Send this as response
  }

  //On Year change
  FYchange(event)
  {
    console.log(event.target)
    this.menu_selected = (event.target.value)
    var selected_menu = this.menu_selected
    console.log(selected_menu)
    this.isDisabled = false
    var arrayu = []
    //setting editable...
    //for current session
      console.log(this.personList)
    //finding the sum Quarterly .......
    this.arr =[];
    Array.prototype.sum  = function (prop) {
      var Q1total = 0
      var Q2total = 0
      var Q3total = 0
      var Q4total = 0
      for ( var i = 0, _len = this.length; i < _len; i++ ) {
        if(selected_menu == this[i].fiscalyear) {
          if(this[i].month == "4" || this[i].month == "5" || this[i].month == "6"){
            //Quarter 1 total
            Q1total += eval(this[i][prop])
          }
          if(this[i].month == "7" || this[i].month == "8" || this[i].month == "9"){
            //Quarter 2 total
            Q2total += eval(this[i][prop])
          }
          if(this[i].month == "10" || this[i].month == "11" || this[i].month == "12"){
            //Quarter 3 total
            Q3total += eval(this[i][prop])
          }
          if(this[i].month == "1" || this[i].month == "2" || this[i].month == "3"){
            //Quarter 4 total
            Q4total += eval(this[i][prop])
          }
        }
      }
      return {Q1total,Q2total,Q3total,Q4total}
  }
    var quarter_total = {
      "total_Import_qty_for_P1":this.personList.sum("Import_qty_for_P1"),
      "total_Import_qty_for_P2":this.personList.sum("Import_qty_for_P2"),
      "total_alumina_lanjigarh_supply_p1":this.personList.sum("alumina_lanjigarh_supply_p1"),
      "total_alumina_lanjigarh_supply_p2":this.personList.sum("alumina_lanjigarh_supply_p2"),
      "total_alumina_req_P1" :this.personList.sum("alumina_req_P1"),
      "total_alumina_req_P2": this.personList.sum("alumina_req_P2"),
      "total_total_alumina_req" :this.personList.sum("total_alumina_req"),
      "total_total_lanjigarh_supply":this.personList.sum("total_lanjigarh_supply"),
      "total_import_qty" : this.personList.sum("total_import_qty")
    } 
    this.arr.push(quarter_total)
    console.log(this.arr)
}


//For monthly search filter
onItemSelect(item: any){
     
  }

  //On de selection of item...
  onItemDeSelect(item : any){
   
  }



  constructor() {
   }

  ngOnInit() {   
//take current year and month..
var today = new Date();
var currentmonth = String(today.getMonth() + 1).padStart(2, '0'); //January is 
var currentyear = today.getFullYear();
var currentdate = today.getDate()
this.current_date = ''+currentmonth+'/'+''+currentdate+'/'+currentyear
console.log(this.current_date)
    //month options..
    this.dropdownList = [
      { item_id: 'Apr', item_text: 'April' },
      { item_id: 'May', item_text: 'May' },
      { item_id: 'Jun', item_text: 'June' },
      { item_id: 'Jul', item_text: 'July' },
      { item_id: 'Aug', item_text: 'August' },
      { item_id: 'Sept', item_text: 'September' },
      { item_id: 'Oct', item_text: 'October' },
      { item_id: 'Nov', item_text: 'November' },
      { item_id: 'Dec', item_text: 'December' },
      { item_id: 'Jan', item_text: 'January' },
      { item_id: 'Feb', item_text: 'February' },
      { item_id: 'Mar', item_text: 'March' },
    ];   
    this.dropdownSettings= {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false,
      enableCheckAll:false,
      maxHeight:150,
    };
//Quarterly sample data....
this.personList  = [
  {
    'Import_qty_for_P1': 1,
    'Import_qty_for_P2': 2,
    'alumina_lanjigarh_supply_p1': "0.00",
    'alumina_lanjigarh_supply_p2': "0.00",
    'alumina_req_P1': "0.00",
    'alumina_req_P2': "0.00",
    'fiscalyear': "2019-20",
    'import_qty': "0",
    'month': "4",
    'total_alumina_req': "0",
    'total_lanjigarh_supply': "0",
    'year':'2019'
    },
  
  {
    'Import_qty_for_P1': 2,
    'Import_qty_for_P2': 2,
    'alumina_lanjigarh_supply_p1': "0.00",
    'alumina_lanjigarh_supply_p2': "0.00",
    'alumina_req_P1': "0.00",
    'alumina_req_P2': "0.00",
    'fiscalyear': "2019-20",
    'import_qty': "0",
    'month': "5",
    'total_alumina_req': "0",
    'total_lanjigarh_supply': "0",
    'year':'2019'
    },
  {
    'Import_qty_for_P1': 3,
    'Import_qty_for_P2': 2,
    'alumina_lanjigarh_supply_p1': "0.00",
    'alumina_lanjigarh_supply_p2': "0.00",
    'alumina_req_P1': "0.00",
    'alumina_req_P2': "0.00",
    'fiscalyear': "2019-20",
    'import_qty': "0",
    'month': "6",
    'total_alumina_req': "0",
    'total_lanjigarh_supply': "0",
    'year':'2019'
    },
    {
      'Import_qty_for_P1': 4,
      'Import_qty_for_P2': 2,
      'alumina_lanjigarh_supply_p1': "0.00",
      'alumina_lanjigarh_supply_p2': "0.00",
      'alumina_req_P1': "0.00",
      'alumina_req_P2': "0.00",
      'fiscalyear': "2019-20",
      'import_qty': "0",
      'month': "7",
      'total_alumina_req': "0",
      'total_lanjigarh_supply': "0",
      'year':'2019'
      },
      {
        'Import_qty_for_P1': 5,
        'Import_qty_for_P2': 2,
        'alumina_lanjigarh_supply_p1': "0.00",
        'alumina_lanjigarh_supply_p2': "0.00",
        'alumina_req_P1': "0.00",
        'alumina_req_P2': "0.00",
        'fiscalyear': "2019-20",
        'import_qty': "0",
        'month': "8",
        'total_alumina_req': "0",
        'total_lanjigarh_supply': "0",
        'year':'2019'
        },
  {
    'Import_qty_for_P1': 6,
    'Import_qty_for_P2': 4,
    'alumina_lanjigarh_supply_p1': "0.00",
    'alumina_lanjigarh_supply_p2': "0.00",
    'alumina_req_P1': "0.00",
    'alumina_req_P2': "0.00",
    'fiscalyear': "2019-20",
    'import_qty': "0",
    'month': "9",
    'total_alumina_req': "0",
    'total_lanjigarh_supply': "0",
    'year':'2019'
    },
    {
      'Import_qty_for_P1': 7,
      'Import_qty_for_P2': 4,
      'alumina_lanjigarh_supply_p1': "0.00",
      'alumina_lanjigarh_supply_p2': "0.00",
      'alumina_req_P1': "0.00",
      'alumina_req_P2': "0.00",
      'fiscalyear': "2019-20",
      'import_qty': "0",
      'month': "10",
      'total_alumina_req': "0",
      'total_lanjigarh_supply': "0",
      'year':'2019'
      },
      {
        'Import_qty_for_P1': 8,
        'Import_qty_for_P2': 3,
        'alumina_lanjigarh_supply_p1': "0.00",
        'alumina_lanjigarh_supply_p2': "0.00",
        'alumina_req_P1': "0.00",
        'alumina_req_P2': "0.00",
        'fiscalyear': "2019-20",
        'import_qty': "0",
        'month': "11",
        'total_alumina_req': "0",
        'total_lanjigarh_supply': "0",
        'year':'2019'
        },
    {
      'Import_qty_for_P1': 9,
      'Import_qty_for_P2': 3,
      'alumina_lanjigarh_supply_p1': "0.00",
      'alumina_lanjigarh_supply_p2': "0.00",
      'alumina_req_P1': "0.00",
      'alumina_req_P2': "0.00",
      'fiscalyear': "2019-20",
      'import_qty': "0",
      'month': "12",
      'total_alumina_req': "0",
      'total_lanjigarh_supply': "0",
      'year':'2019'
      },
{
      'Import_qty_for_P1': 10,
      'Import_qty_for_P2': 3,
      'alumina_lanjigarh_supply_p1': "0.00",
      'alumina_lanjigarh_supply_p2': "0.00",
      'alumina_req_P1': "0.00",
      'alumina_req_P2': "0.00",
      'fiscalyear': "2019-20",
      'import_qty': "0",
      'month': "1",
      'total_alumina_req': "0",
      'total_lanjigarh_supply': "0",
      'year':'2020'
      },
      {
        'Import_qty_for_P1': 11,
        'Import_qty_for_P2': 3,
        'alumina_lanjigarh_supply_p1': "0.00",
        'alumina_lanjigarh_supply_p2': "0.00",
        'alumina_req_P1': "0.00",
        'alumina_req_P2': "0.00",
        'fiscalyear': "2019-20",
        'import_qty': "0",
        'month': "2",
        'total_alumina_req': "0",
        'total_lanjigarh_supply': "0",
        'year':'2021'
        },
        {
          'Import_qty_for_P1': 12,
          'Import_qty_for_P2': 3,
          'alumina_lanjigarh_supply_p1': "0.00",
          'alumina_lanjigarh_supply_p2': "0.00",
          'alumina_req_P1': "0.00",
          'alumina_req_P2': "0.00",
          'fiscalyear': "2019-20",
          'import_qty': "0",
          'month': "3",
          'total_alumina_req': "0",
          'total_lanjigarh_supply': "0",
          'year':'2021'
          },
  {
    'Import_qty_for_P1': 10,
    'Import_qty_for_P2': 3,
    'alumina_lanjigarh_supply_p1': "0.00",
    'alumina_lanjigarh_supply_p2': "0.00",
    'alumina_req_P1': "0.00",
    'alumina_req_P2': "0.00",
    'fiscalyear': "2018-19",
    'import_qty': 0,
    'month': "4",
    'total_alumina_req': "0",
    'total_lanjigarh_supply': "0",
    'year':'2019'
    },
  {
    'Import_qty_for_P1': 11,
    'Import_qty_for_P2': 3,
    'alumina_lanjigarh_supply_p1': "0.00",
    'alumina_lanjigarh_supply_p2': "0.00",
    'alumina_req_P1': "0.00",
    'alumina_req_P2': "0.00",
    'fiscalyear': "2018-19",
    'import_qty': 0,
    'month': "8",
    'total_alumina_req': "0",
    'total_lanjigarh_supply': "0",
    'year':'2019'
    },
    {
      'Import_qty_for_P1': 12,
      'Import_qty_for_P2': 3,
      'alumina_lanjigarh_supply_p1': "0.00",
      'alumina_lanjigarh_supply_p2': "0.00",
      'alumina_req_P1': "0.00",
      'alumina_req_P2': "0.00",
      'fiscalyear': "2018-19",
      'import_qty': "0",
      'month': "10",
      'total_alumina_req': "0",
      'total_lanjigarh_supply': "0",
      'year':'2019'
      },
      {
        'Import_qty_for_P1': 12,
        'Import_qty_for_P2': 3,
        'alumina_lanjigarh_supply_p1': "0.00",
        'alumina_lanjigarh_supply_p2': "0.00",
        'alumina_req_P1': "0.00",
        'alumina_req_P2': "0.00",
        'fiscalyear': "2018-19",
        'import_qty': "0",
        'month': "5",
        'total_alumina_req': "0",
        'total_lanjigarh_supply': "0",
        'year':'2019'
        },
        {
          'Import_qty_for_P1': 12,
          'Import_qty_for_P2': 3,
          'alumina_lanjigarh_supply_p1': "0.00",
          'alumina_lanjigarh_supply_p2': "0.00",
          'alumina_req_P1': "0.00",
          'alumina_req_P2': "0.00",
          'fiscalyear': "2018-19",
          'import_qty': "0",
          'month': "6",
          'total_alumina_req': "0",
          'total_lanjigarh_supply': "0",
          'year':'2019'
          },
          {
            'Import_qty_for_P1': 12,
            'Import_qty_for_P2': 3,
            'alumina_lanjigarh_supply_p1': "0.00",
            'alumina_lanjigarh_supply_p2': "0.00",
            'alumina_req_P1': "0.00",
            'alumina_req_P2': "0.00",
            'fiscalyear': "2018-19",
            'import_qty': "0",
            'month': "7",
            'total_alumina_req': "0",
            'total_lanjigarh_supply': "0",
            'year':'2019'
            },
            {
              'Import_qty_for_P1': 12,
              'Import_qty_for_P2': 3,
              'alumina_lanjigarh_supply_p1': "0.00",
              'alumina_lanjigarh_supply_p2': "0.00",
              'alumina_req_P1': "0.00",
              'alumina_req_P2': "0.00",
              'fiscalyear': "2018-19",
              'import_qty': "0",
              'month': "9",
              'total_alumina_req': "0",
              'total_lanjigarh_supply': "0",
              'year':'2019'
              },
              {
                'Import_qty_for_P1': 12,
                'Import_qty_for_P2': 3,
                'alumina_lanjigarh_supply_p1': "0.00",
                'alumina_lanjigarh_supply_p2': "0.00",
                'alumina_req_P1': "0.00",
                'alumina_req_P2': "0.00",
                'fiscalyear': "2018-19",
                'import_qty': "0",
                'month': "11",
                'total_alumina_req': "0",
                'total_lanjigarh_supply': "0",
                'year':'2019'
                },
                {
                  'Import_qty_for_P1': 12,
                  'Import_qty_for_P2': 3,
                  'alumina_lanjigarh_supply_p1': "0.00",
                  'alumina_lanjigarh_supply_p2': "0.00",
                  'alumina_req_P1': "0.00",
                  'alumina_req_P2': "0.00",
                  'fiscalyear': "2018-19",
                  'import_qty': "0",
                  'month': "12",
                  'total_alumina_req': "0",
                  'total_lanjigarh_supply': "0",
                  'year':'2019'
                  },
                  {
                    'Import_qty_for_P1': 12,
                    'Import_qty_for_P2': 3,
                    'alumina_lanjigarh_supply_p1': "0.00",
                    'alumina_lanjigarh_supply_p2': "0.00",
                    'alumina_req_P1': "0.00",
                    'alumina_req_P2': "0.00",
                    'fiscalyear': "2018-19",
                    'import_qty': "0",
                    'month': "1",
                    'total_alumina_req': "0",
                    'total_lanjigarh_supply': "0",
                    'year':'2020'
                    },
                    {
                      'Import_qty_for_P1': 12,
                      'Import_qty_for_P2': 3,
                      'alumina_lanjigarh_supply_p1': "0.00",
                      'alumina_lanjigarh_supply_p2': "0.00",
                      'alumina_req_P1': "0.00",
                      'alumina_req_P2': "0.00",
                      'fiscalyear': "2018-19",
                      'import_qty': "0",
                      'month': "2",
                      'total_alumina_req': "0",
                      'total_lanjigarh_supply': "0",
                      'year':'2019'
                      },
                      {
                        'Import_qty_for_P1': 12,
                        'Import_qty_for_P2': 3,
                        'alumina_lanjigarh_supply_p1': "0.00",
                        'alumina_lanjigarh_supply_p2': "0.00",
                        'alumina_req_P1': "0.00",
                        'alumina_req_P2': "0.00",
                        'fiscalyear': "2018-19",
                        'import_qty': "0",
                        'month': "3",
                        'total_alumina_req': "0",
                        'total_lanjigarh_supply': "0",
                        'year':'2019'
                        },
           


    ];  

   
  
}
}
