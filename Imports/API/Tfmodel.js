import React, {Component} from 'react';
import * as tf from "@tensorflow/tfjs";

let linerModel = tf.Sequential,
    prediction = [],
    model = tf.model,
    predictions=[];

Meteor.methods({

    "train"(){
        //this.trainNewModel();
        try{
            tf.loadModel('../Assets/model.json')
                .then((resp)=>{
                    console.log(resp)
                });
        }catch (e){
            if(e)throw e;
        }

    },

    async loadModel() {
        this.model = await tf.loadModel('../Assets/model.json');
    },

   "predict"(imga){

        try{
            console.log("predict");
            const pred = tf.tidy(()=>{
                let img = tf.fromPixels(imga,1);
                img = img.reshape([1,28,28,1]);
                img = tf.cast(img, "float32");

                let output = [];
                output = this.model.predict(img);

                this.predictions = Array.from(output.dataSync());
                console.log(this.predictions);
        });
            return pred;
        }
        catch (e){

        }


   },


});


/*class Tfmodel extends Component {

    constructor(props){
        super(props);
        this.state = {
            linearModel :tf.Sequential,
            prediction:[],
            model:tf.model,
            predictions:[]
        }
    }

    componentWillMount(){
        this.trainNewModel();
        this.loadModel();
    }

    async trainNewModel() {
        // Define a model for linear regression.
        this.linearModel = tf.sequential();
        this.linearModel.add(tf.layers.dense({units: 1, inputShape: [1]}));

        // Prepare the model for training: Specify the loss and the optimizer.
        this.linearModel.compile({loss: 'meanSquaredError', optimizer: 'sgd'});


        // Training data, completely random stuff
        const xs = tf.tensor1d([3.2, 4.4, 5.5, 6.71, 6.98, 7.168, 9.779, 6.182, 7.59, 2.16, 7.042, 10.71, 5.313, 7.97, 5.654, 9.7, 3.11]);
        const ys = tf.tensor1d([1.6, 2.7, 2.9, 3.19, 1.684, 2.53, 3.366, 2.596, 2.53, 1.22, 2.87, 3.45, 1.65, 2.904, 2.42, 2.4, 1.31]);


        // Train
        await this.linearModel.fit(xs, ys);

        console.log('model trained!')
    }

    async loadModel() {
        this.model = await tf.loadModel('../Assets/model.json');
    }

    async predict(imageData){
        console.log("predict");
        const pred = await tf.tidy(()=>{
            let img = tf.fromPixels(imageData,1);
            img = img.reshape([1,28,28,1]);
            img = tf.cast(img, "float32");

            let output = [];
            output = this.model.predict(img);

            this.predictions = Array.from(output.dataSync());

        })
    }

    componentWillUpdate(){
        this.predict(this.props.imga)
    }


}


export default Tfmodel;*/
