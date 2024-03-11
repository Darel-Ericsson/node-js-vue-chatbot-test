import express from 'express'
import * as dotenv from "dotenv";
import cors from 'cors';
import { OpenAI } from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();


const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro-latest"});

const app = express();
app.use(cors());
app.use(express.json());

app.post("/", async (req, res) =>{
    try {
        const question = req.body.question;

        const result = await model.generateContent(`${question}`);
        const response = await result.response
        const text = response.text();
        // console.log(response);
        res.status(200).send({
            bot: text,
        });
    } catch (error) {
        // console.error(error);
        res.status(500).send(error || "Something went wrong");
    }
});

app.listen(8000, ()=>{
  console.log('App is running');
})