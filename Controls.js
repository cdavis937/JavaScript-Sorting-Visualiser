class Controls {

    constructor(){

        this.sliderX = windowWidth/50;

        this.bubbleSorting = false;

        this.quickSorting = false;

        this.heapSorting = false;

        this.radixSorting = false;

        this.buttonPressed = false;

    }

    numOfBars(bars){

        //Text for user
        fill(0);
        textSize(windowWidth/35);
        text("Number of data", windowWidth/200, windowHeight/20);

        //Draw line for the slider
        fill(0);
        strokeWeight(3);
        line(windowWidth/50, windowHeight/10, windowWidth/5, windowHeight/10);
        strokeWeight(1);

        //Draw sliding ellispe
        ellipse(this.sliderX, windowHeight/10, windowHeight/50, windowHeight/50);

        //Move the ellispe if it is not sorting and reset values
        if(bars.returnFinished()){
            if(mouseY > windowHeight/10 - windowHeight/50 && mouseY < windowHeight/10 + windowHeight/50){
                if(mouseX > this.sliderX - windowWidth/50 && mouseX < this.sliderX + windowWidth/50){
                    if(mouseIsPressed){
                        if(mouseX > windowWidth/50 && mouseX < windowWidth/5){
                            this.sliderX = mouseX;
                            let num = Math.round((this.sliderX - windowWidth/50 + 20)/2);
                            bars.setNum(num);
                            this.bubbleSorting = false;
                            this.quickSorting = false;
                            this.heapSorting = false;
                            this.radixSorting = false;
                            this.buttonPressed = false;
                        }
                    }
                }
            }
        }
        

    }

    bubbleSort(){

        //Tell the program if the bubble sort button is pressed

        fill(0);
        text("Bubble Sort", windowWidth/3, windowHeight/20);
        fill(0);
        ellipse(windowWidth/3.3, windowHeight/25, windowHeight/40, windowHeight/40);
        fill(0);

        this.bubbleSorting = false;

        if(!this.buttonPressed){
            if(mouseY > windowHeight/25 - windowHeight/40 && mouseY < windowHeight / 25 + windowHeight/40){
                if(mouseX > windowWidth/3.3 - windowHeight/40 && mouseX < windowWidth/3.3 + windowHeight/40){
                    if(mouseIsPressed){
                        this.bubbleSorting = true;
                        this.buttonPressed = true;
                    }
                }
            }
        }
        

        return this.bubbleSorting;

    }

    radixSort(){
        
        //Tell the program if the radix sort button is pressed
    
        fill(0);
        text("Radix Sort", windowWidth/1.5, windowHeight/20);

        fill(0);
        ellipse(windowWidth/1.58, windowHeight/25, windowHeight/40, windowHeight/40);
        fill(0);

        this.radixSorting = false;

        if(!this.buttonPressed){
            if(mouseY > windowHeight/25 - windowHeight/40 && mouseY < windowHeight / 25 + windowHeight/40){
                if(mouseX > windowWidth/1.58 - windowHeight/40 && mouseX < windowWidth/1.58 + windowHeight/40){
                    if(mouseIsPressed){
                        this.radixSorting = true;
                        this.buttonPressed = true;
                        console.log("Radix sorting pressed");
                    }
                }
            }
        }
        

        return this.radixSorting;

    }

    quickSort(){

        //Tell the program if the quick sort button is pressed

        this.quickSorting = false;

        fill(0);
        text("Quick Sort", windowWidth/3, windowHeight/10);

        fill(0);
        ellipse(windowWidth/3.3, windowHeight/11, windowHeight/40, windowHeight/40);
        fill(0);
        if(!this.buttonPressed){
            if(mouseY > windowHeight/11 - windowHeight/40 && mouseY < windowHeight / 11 + windowHeight/40){
                if(mouseX > windowWidth/3.3 - windowHeight/40 && mouseX < windowWidth/3.3 + windowHeight/40){
                    if(mouseIsPressed){
                        this.quickSorting = true;
                        this.buttonPressed = true;
                    }
                }
            }
        }
        

        return this.quickSorting;

    }

    sleep(millisecondsDuration)
    {
        return new Promise(resolve => setTimeout(resolve, millisecondsDuration));
    }

    heapSort(){
        
        //Tell the program if the heap sort button is pressed

        this.heapSorting = false;

        fill(0);
        text("Heap Sort", windowWidth/1.5, windowHeight/10);

        fill(0);
        ellipse(windowWidth/1.58, windowHeight/11, windowHeight/40, windowHeight/40);
        fill(0);

        if(!this.buttonPressed){
            if(mouseY > windowHeight/11 - windowHeight/40 && mouseY < windowHeight / 11 + windowHeight/40){
                if(mouseX > windowWidth/1.58 - windowHeight/40 && mouseX < windowWidth/1.58 + windowHeight/40){
                    if(mouseIsPressed){
                        this.heapSorting = true;
                        this.buttonPressed = true;
                    }
                }
            }
        }

        return this.heapSorting;

    }

    drawControls(bars){

        //Runs the controls and which sort to do, as well as setting the size of array

        fill(150);
        noStroke();
        rect(0, 0, windowWidth, windowHeight/ 8.5);

        stroke(0);

        this.numOfBars(bars);

        if(this.bubbleSort()){
            return 1;
        }

        if(this.radixSort()){
            return 2;
        }

        if(this.quickSort()){
            return 3;
        }

        if(this.heapSort()){
            return 4;
        }

        return 0;

    }

};