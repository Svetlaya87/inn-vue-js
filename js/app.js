import {chiniesAnimals} from './chiniesCalendar.js';


const appConfig = {
    data(){
        return {
            inn: 0,
            totRes:[],
            xDate:[]
            
        }
    },
    computed: {// компъютед - это раздел, внутри которого есть методы, т.е фун кции. Эти функции будут вызываться при изменении модели данных
         

    },
    methods:{
        birthDay(){
            
            
            console.log(typeof(this.inn), this.inn);
            let res = (this.inn+'').split('').map(a => a*1).slice(0,5).join('')*1;
            console.log(res);
            let birthDayDate= new Date ( 1899,11,31 + res );

            console.log(birthDayDate);
               let day= birthDayDate.getDate();
                let month=birthDayDate.getMonth();
                let year = birthDayDate.getFullYear();
                day = day<10?'0'+ day:day;
                month = month+1<10?'0'+ (month+1):month+1;
                 this.xDate=[day, month, year]; //в массиве указать переменные
                this.totRes.push(['Дата рождения',`${day}.${month}.${year}`]);
                console.log(this.xDate);
                console.log(this.totRes);
 
        },
        zodiac(){

            console.log(this.xDate);
            let zodiacTable = [
              
                ['Овен',		[21, 3],   [19, 4] ],
                ['Телец',		[20, 4],   [20, 5] ],
                ['Близнецы',	[21, 5],   [20, 6] ],	
                ['Рак',		    [21, 6],   [22, 7] ],
                ['Лев',	        [23, 7],   [22 ,8] ],	
                ['Дева',		[23, 8],   [22, 9] ],	
                ['Весы'	,	    [23, 9],   [22,10] ],	
                ['Скорпион',	[23,10] ,  [21,11] ],

                ['Стрелец',		[22, 11] , [21,12] ],
                ['Козерог',		[22,12] ,  [19 ,1] ],	
                ['Водолей',		[20 ,1] ,  [18, 2] ],	
                ['Рыбы',		[19,2 ] ,  [20 ,3] ]
            ]

            console.log(zodiacTable[0][2][1]);
            

            for(let i=0; i< zodiacTable.length; i++){

                if ( zodiacTable[i][2].includes(this.xDate[1]*1) ){
                    
                    /*
                    this.znakZodiaka.push( zodiacTable.filter( a  => a[2][1]==this.xDate[1]*1).map(a => a=a[0]) );
                    this.znakZodiaka.push( zodiacTable.filter( a  => a[2][1]==this.xDate[1]*1).map(a => a=a[1]) );
                    this.znakZodiaka.push( zodiacTable.filter( a  => a[2][1]==this.xDate[1]*1).map(a => a=a[2]) );
                    */

                    
                    let x = zodiacTable[i];
                    console.log(x);
                   
                    if( this.xDate[0]*1 <= x[2][0] ){
                        this.totRes.push(['Знак зодиака', x[0] ]);
                        
                    }else{
                        if(i==11){
                            i=-1
                        }
                        this.totRes.push(['Знак зодиака',`${zodiacTable[i+1][0]}`]);
                    }

                    break;
                }

            }

            

            
        },
        chineseHoroscope(){
            console.log(this.xDate);
            let chiniesYear;
            for(let i=0; i< chiniesAnimals.length; i++){
                if(chiniesAnimals[i]["EndYear"].indexOf(this.xDate[2]+'', 0) != -1 ){

                    if( this.xDate[1]*1>1*chiniesAnimals[i]["EndYear"].split('.')[1] || (this.xDate[1]*1==1*chiniesAnimals[i]["EndYear"].split('.')[1] && this.xDate[0]*1>1*chiniesAnimals[i]["EndYear"].split('.')[2] )){
                        
                        chiniesYear = chiniesAnimals[i+1]["Animal"]; // в таблице данных последний год 2044, 2045 год не учтен
                        console.log(chiniesAnimals[i+1]);
                        
                    }else{
                        chiniesYear = chiniesAnimals[i]["Animal"];
                        console.log(chiniesAnimals[i]);
                    }

                    this.totRes.push(['Год по китайскому календарю', `${chiniesYear}`]);
                    
                    
                    break;

                }
            }
        

            
            
        },
        validation(){
            let contrCounts = [-1, 5, 7, 9, 4, 6, 10, 5, 7];
            let innArray = (this.inn+'').split('').map(a => a*1);
            console.log(innArray);
            let n10 = innArray.slice(0,9);
            console.log(n10);
            n10 = n10.map( (a,i) => a=a*contrCounts[i]);
            console.log(n10);
            n10 = n10.reduce( (acc, el) => acc+el, 0);
            console.log(n10);
            n10 = (n10%11)%10;
            console.log(n10);
            if(this.totRes.length != 0){
                this.totRes = [];
            }

            if (innArray.length !=10 ||  n10 != innArray[9] ){
                
                this.totRes.push(['Валидация','Не корректен!']);
                
                
            } else{
                //this.totRes.splice(0,1);
                this.totRes.push(['Валидация','Корректен!']);
                this.birthDay();
                if(innArray[8]%2 == 0){
                    this.totRes.push(['Пол','женский']);

                }else{
                    this.totRes.push(['Пол','мужской']);
                }

                this.zodiac();
                this.chineseHoroscope();
                
            }
            console.log(this.totRes);
            

            
            
        },
        
    }

    
}

const app = Vue.createApp(appConfig);
app.component('one-key',{ // по идее мы должны уведомлять родителя, если qt изменилось в дочернем компоненте о его изменении, но Vue сам это отслеживает (назвается реактивность) через rates в data в родит. компоненте. Но реактивновсть работает только на 2 уровня вложенности, т.е следит за массивом rates и его компонентами, если внутри компонентов еще объекты лежат и массивы, то там уже не отслеживается
    props:['onePerson'],
    template:`
        <div class='my-2'>
            {{ onePerson[0] }}: {{ onePerson[1] }}
            
        </div>
    `
});
// механизм реактивности- отслеживание изменений данных в модели, так же и компютеды пересчитывают формулы, когда в модели что-то меняется
// если был бы в массиве еще один уровень вложенности, то пришлось бы при изменении в дочернем элементе сообщать об изменении родителю
app.mount('#app');


