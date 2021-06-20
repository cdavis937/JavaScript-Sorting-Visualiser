class Bars {

    constructor(){

        this.num = 25;
        this.values = [];
        this.colors = [];

        this.inOrder = false;
        
        this.numberSorted = 25;

        this.counted = 0;

        this.alreadyFinsihed = false;

        this.firstPass = true;

        this.Arr2 = [];
        this.Arr1 = [];

        this.osc = new p5.Oscillator('sine');
    }

    createBars(){

        this.values = [];

        //Create random values and sotre them in an array
        for(let i = 0; i < this.num; i++){
            
            //Give it value that fits inside the screen height
            this.values[i] = Math.floor(Math.random() * windowHeight/1.15);

            //Initialize the color to purple
            this.colors[i] = 'p';

        }

        //Reset the variables since new array has been made
        this.sorted = false;

        this.counted = this.values.length;

        

        this.firstPass = true;

    }

    drawBars(){

        fill(150);
        noStroke();
        rect(0 , windowHeight/7.8, windowWidth, windowHeight/1.15);
        stroke(0);

        //Color the boxes purple
        

        //Display the rectangles with their random height
        for(let i = 0; i < this.values.length; i++){

            //Fill the rectangles according to their colors
            if(this.colors[i] == 'p'){
                fill(100,100,255);
            }else if(this.colors[i] == 'g'){
                fill(0,255,0);
            }else if(this.colors[i] == 'r'){
                fill(255,0,0);
            }

            //Create rectangle that fits all of them in the screen
            rect(windowWidth/this.num * i, windowHeight, windowWidth/this.num, - this.values[i]);
        }

    }
    
    async radixSort() {

        //Set alreadyFinished to false so that new array can not be made
        this.alreadyFinsihed = false;

        //Set up the oscillator 
        this.osc.start();
        this.osc.amp(.5);
        
        //Find the maximum value
        const maxNum = Math.max(...this.values) * 10;

        //Initialize the divisor
        let divisor = 1;

        //As long as every digit has not been accounted for
        while (divisor < maxNum) {
                
                //Srt up the ten buckets
                let buckets = [[],[],[],[],[],[],[],[],[],[]];
                
                //For every number in the array
                for(let num in this.values){

                    //Grab the digit in a ceartain place
                    let val = Math.floor((this.values[num] / divisor) % 10);

                    //Organize the values by their digits in a ceatain place
                    buckets[val].push(this.values[num]);

                }
                
                //Create a clone
                let bucketClone = [...buckets];

                //Start a counter
                let count = 0;

                //For every value push it into the array based off where it is in the bucket array
                for(let i = buckets.length - 1; i >= 0; i--){
                    for(let n in buckets[i]){
                     
                        //As long as the array is not in order keep sorting
                        if(!this.inOrder){
                            this.colors[count] = 'g';
                            
                            await this.sleep(25);

                            this.colors[count] = 'p';

                            this.values[count] = bucketClone[i][n];

                            this.osc.freq(bucketClone[i][n]);

                            count += 1;
                        }
            
                    }
                    
                }

                //Increase the divisor to get the next digit place
                divisor *= 10;

            }

        return;
           
           
    }
        
     
    async heapify(n , i){

        //Initialize the values
        let smallest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        //If the left is in bounds and smaller than the smallest term make it the largest
        if(left < n && this.values[left] < this.values[smallest]){
            smallest = left;
        }

        //If the right is in bounds and smaller than the smallest make it the largest
        if(right < n && this.values[right] < this.values[smallest]){
            smallest = right;
        }

        //If the smallest value changed from the begining, then swap it and keep doing that until it does not change
        if(smallest != i){
            
            this.osc.freq(this.values[i]);
            
            await this.swap(i, smallest);

            await this.heapify(n, smallest);
        }

        

    }

    async heapSort() {

        //Set alreadyFinished to false so that new array can not be made
        this.alreadyFinsihed = false;

        //Initialize the oscilattor
        this.osc.start();
        this.osc.amp(.5);

        //Heap sort the whole array intially so smallest it at the left
        for(let i = this.values.length - 1; i >= 0; i--){
            await this.heapify(this.values.length, i);
        }

        //Move next smallest value to the left and swap it over into the array
        for(let i = this.values.length - 1; i > 0; i--){
            
            await this.swap(0, i);

            await this.heapify(i, 0);
        }

        

    }

    async bubbleSort() {

        //Srt alreadyFinsihed to false so that new array can not be made
        this.alreadyFinsihed = false;

        //Start the oscillator
        this.osc.start();
        this.osc.amp(.5);

        //Swap values if the one to the right is larger than the one to the left
        for(let i = 0; i < this.values.length; i++){
            for(let j = 0; j < this.numberSorted - 1; j ++){
                if(this.values[j] < this.values[j+1]){
                    await this.swap(j, j+1);
                    
                    this.osc.freq(this.values[j]);
                }
            }
            //Decrease number sorted to improve efficency
            this.numberSorted -= 1;
        }

        
    }

    async quickSort(start, end){

        //Set alreadyFinished to false so that a new array can not be made
        this.alreadyFinsihed = false;

        //If this is the first pass start the oscilattor
        if(this.firstPass){
            this.osc.start();
            this.firstPass = false;
        }
        
        //Return if the start is the same or greater than the end
        if(start >= end){
            return;
        }

        this.checkIfSorted();

        //As long as it is not in order then split the values into two groups and then resort those two groups
        if(!this.inOrder){
            let index = await this.partition(start, end);
            
            await Promise.all([
                await this.quickSort(start, index - 1),
                await this.quickSort(index + 1, end)
            ]);
               
        }

    }

    async partition(start, end){
        
        //Initialize the values
        let pivotIndex = start;
        let pivot = this.values[end];

        //Make values bigger than pivot go the left and smaller vlaues than the pivot to the left
        for(let i = start; i < end; i++){
            if(this.values[i] > pivot){
                
                this.osc.amp(.5);
                this.osc.freq(this.values[i]);
                

                await this.swap(i, pivotIndex);
                pivotIndex++;
            }
        }

        //Swap the pivot index where it properly goes
        await this.swap(end, pivotIndex);

        return pivotIndex;
    }

    sleep(millisecondsDuration)
    {
        return new Promise(resolve => setTimeout(resolve, millisecondsDuration));
    }

    setNum(n){
        
        //Create an array of size n 
        this.num = n;
        this.numberSorted = n;
        this.createBars();
    }

    async swap(val1, val2){

        
        //Set values being swaped to green
        this.colors[val1] = 'g';
        this.colors[val2] = 'g';

        //Wait for 25 milliseconds
        await this.sleep(25);

        //Swap values and reset colors to purple
        let temp = this.values[val1];
        this.values[val1] = this.values[val2];
        this.values[val2] = temp;
        this.colors[val1] = 'p';
        this.colors[val2] = 'p';

    }

    checkIfSorted(){
        
        //Assume it is sorted
        this.inOrder = true;

        //Check every value and its adjacent and see if they are all in order
        for(let j = 0; j < this.values.length - 1; j++){
            if(this.values[j] < this.values[j+1]){
                this.inOrder = false;
            }
        }

        //If it is sorted then run the finsihed animation
        if(this.inOrder && !this.alreadyFinsihed){
            this.finishAnim();
            this.alreadyFinsihed = true;
        }

        //Return if it is in order
        return this.inOrder;

    }

    returnNum(){
        
        //Return the size of the array
        return this.values.length;
    }

    async finishAnim() {

        //As long as the animation has not been run
        if(!alreadyFinished){

            //Set up the amp
            this.osc.amp(.5, .1);

        //Display boxes in red and make another one red in 25 milliseconds
        for(let i = this.values.length - 1; i >= 0; i--){
            this.colors[i] = 'r'
            await this.sleep(25);
            
            this.osc.freq(this.values[i], .1);
        }

        //Say that the animation has run
        this.alreadyFinsihed = true;

        //Stop the oscillator
        this.osc.stop();
    
        return;
        }
        
        
        
        

        

}

    returnFinished(){
        
        //Return if the array has been sorted
        return this.alreadyFinsihed;
    }

};