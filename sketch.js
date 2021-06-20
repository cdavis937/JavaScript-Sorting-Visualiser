let barObj;
let controls;

var i = 0;
var j = 0;

var sorted = false;

let size;

var alreadyFinished = false;

function setup() {
  createCanvas(windowWidth, windowHeight);

  barObj = new Bars();

  controls = new Controls();

  frameRate(100);

  background(150);

  
}

function draw() {

  //Check if a sort option has been pressed
  let sort = controls.drawControls(barObj);

  //Check if the array has been sorted
  barObj.checkIfSorted();

  //Draw the bars
  barObj.drawBars();
  
  //Preform a ceartain sort if the option is slected
  switch(sort){
    case 1:
      barObj.bubbleSort();      
    break;
    case 2:
      barObj.radixSort();
    break;
    case 3:
      barObj.quickSort(0, barObj.returnNum() - 1);
    break;
    case 4:
      barObj.heapSort();
    break;
    default:
      
    break;
  }
  
    
    
  

}
