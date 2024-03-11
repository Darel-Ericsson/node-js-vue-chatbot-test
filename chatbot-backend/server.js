import express from 'express'
import * as dotenv from "dotenv";
import cors from 'cors';
import { OpenAI } from 'openai';

dotenv.config();
const openai = new OpenAI ({
    apiKey: process.env.OPENAI_KEY,
});

const app = express();
app.use(cors());
app.use(express.json());

app.post("/", async (req, res) =>{
    try {
        const question = req.body.question;

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${question}`,
            temperature: 0,
            max_tokens: 3000,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });
        // console.log(response);
        res.status(200).send({
            bot: response.data.choices[0].text,
        });
    } catch (error) {
        // console.error(error);
        res.status(500).send(error || "Something went wrong");
    }
});

app.listen(8000, ()=>{
  console.log('App is running');
})