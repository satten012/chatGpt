import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Configuration, OpenAIApi } from 'openai'
import { useState } from 'react'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  /* */
  const [prompt, setPrompt] = useState("");
  const [resposes, setResponses] = useState([]);
  const [messages, setMessages] = useState ([])
  const [loading, setLoading] = useState(false); 


  const sendMessage = async () => {
    /*
    const configuration = new Configuration({
    apiKey: "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",
});
    const openai = new OpenAIApi(configuration)

    setLoading(true)

    // сохранение 
    setResponses(prevResponses => [...prevResponses, prompt])

    const respose = await openai.createCompletion({
      
      model:"text-davinci-003", // генерирует простые текста гпт 3,0
      prompt: prompt, // сообщение которые отсылаю модели
      temperature: 0.7, // отвечает за креативность
      max_tokens: 2048, // максимальное к-во токенов которое потрачу при запросе 
    });

    setPrompt("")

    setLoading(false)

    // заносит ответ от бота в саму модель  response.data.choices[0].text ответ от модели в результате
    setResponses(prevResponses => [...prevResponses, respose.data.choices[0].text])*/

    //


    messages.push({role:"user", content: prompt}) // добавляет в переменную мои сообщения

    let options = {
      method:"POST",
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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'
      },
      body:JSON.stringify({
        'model': 'gpt-3.5-turbo',
        'messages':messages
      })
    }

    
    setLoading(true)


    // сохранение  https://www.youtube.com/watch?v=uFOwaRjh1EE
    setResponses(prevResponses => [...prevResponses, prompt])


    setPrompt("")

    const response = await fetch ('https://api.openai.com/v1/chat/completions', options)
    const data = await response.json()

    setLoading(false)


    setResponses(prevResponses => [...prevResponses, data.choices[0].message.content])
    setMessages(prevResponses => [...prevResponses, {role:"assistant", content: data.choices[0].message.content},{role:"system",
    content: "You're a JavaScipt Mentor, so talk like JavaScript Developer"}])
    messages.push({role:"assistant", content: data.choices[0].message.content},{role:"system",
    content: "You're a JavaScipt Mentor, so talk like JavaScript Developer my main goal is to get a job as a front-end developer, and your task is to help me in this now i know HTML CSS JavaScript i want you to bring me closer to my goal to get job as Frond end developer of getting a job in every post you are my mentor Frontend Developer"}) // добавляет в переменную ответы чата

  } 

  return (
    <main>
      <div className='container flex justify-center w-full mx-auto bg-black'>
        <div className='w-1/3 mt-20'>
        <h2 className='mb-5 text-5xl text-center text-white'>MY CHAT APP</h2>
        <div className='border rounded-md '>

          <div className='p-6 border-b'> 
          <p className='text-center text-white text-md'>Your chat history</p>
          </div>
          <div className='p-6 border-b'>

            {resposes && resposes.map((item, index) => {
              return(
                <div  key={index} className='p-4 rounded-md bg-zinc-500'>
                    <p className='mr-2 text-xs text-zinc-200'>[{index + 1}]</p>
                    <p className='text-sm text-white'>{item}</p>
                  </div>
              )
            })}
              {loading && (
                <p className='text-white'>loading...</p>
              )}
          </div>
          <div className='flex p-6 border-t '>
            <input onChange={(e) => {setPrompt(e.target.value)}} value ={prompt} type ="text" className='w-8/12 px-4 py-2 text-white bg-zinc-600 roundend-tl-md rounded-td-md' placeholder='Your message goes here'/>
            <button onClick={() => {sendMessage()}} type = "button" className='w-4/12 text-white bg-zinc-700 rounded-tr-md rounded-br-md'>Send</button>
          </div>

        </div>
        </div>
      </div>
    </main>
  )
}
