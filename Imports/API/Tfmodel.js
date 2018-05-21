import React, {Component} from 'react';
import * as tf from "@tensorflow/tfjs";

let linerModel = tf.Sequential,
    prediction = [],
    model = tf.model,
    predictions=[];

Meteor.methods({

    "train"(){
       tf.loadModel("Assets/model.json")
           .then(resp=> console.log(resp))
           .then(res => {this.model=res})
           .catch(e=>{throw e});
    },

    async loadModel(){
        this.model = await tf.loadModel("Assets/model.json");
    },
   "predict"(imga){
            console.log(this.model);
            tf.tidy(()=>{
                let img = tf.fromPixels(imga,1);
                console.log(img);
                img = img.reshape([1,28,28,1]);
                img = tf.cast(img, "float32");

                let output = [];
                output = this.model.predict(img);

                this.predictions = Array.from(output.dataSync());
                console.log(this.predictions);
        });


   },


});


