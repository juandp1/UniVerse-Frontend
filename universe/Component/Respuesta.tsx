import style from "/styles/ForoStyles.module.css";
import * as FaIcon from 'react-icons/fa';
import * as BsIcon from 'react-icons/bs';
import Cookies from "js-cookie"


interface Props {
    num_response: number,
    question_id: number,
    description: string
    score: number,
    user_id: number
}
function Respuesta({
    num_response,
    question_id,
    description,
    score,
    user_id }: Props) {


    const VoteResponse = async (vote: string) => {
        console.log("voteee")
        try {
            const res = await fetch('http://localhost:3333/api/responses/'+num_response, {
                method: 'POST',
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                },
                body: JSON.stringify({ "vote_type": vote })

            });

            if (res.ok) {
                console.log('Error:', "se voto correctamente");
                alert("voto registrado con exito");
            } else {
                throw new Error('error al votar');
            }
        } catch (error: any) {
            console.error('Error:', error);
            alert(error.message);
        }

    }

    return (
        <>
            <div className={style.respuesta}>
                <div className='flex flex-wrap justify-center'>
                    <FaIcon.FaUserCircle size={'85px'} />
                </div>
                <div>
                    <h2>Respuesta</h2>
                    <p >{description}</p>
                </div>
                <div>
                    <h2>Puntuacion {score}</h2>
                    <div className={style.votos}>
                        <div className={style.upvote}>
                            <BsIcon.BsFillHandThumbsUpFill onClick={() => VoteResponse("1")} size={"35px"} />
                        </div>
                        <div className={style.downvote}>
                            <BsIcon.BsFillHandThumbsDownFill onClick={() => VoteResponse("-1")} size={"35px"} />
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Respuesta