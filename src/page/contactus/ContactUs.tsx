// import contactus from '../../images/contactus.jpg'
import { useLottie } from 'lottie-react';
import contactAnim from '../../animation/contactus.json';
import {io, Socket}  from 'socket.io-client'
import { useEffect, useRef, useState } from 'react';

interface ICECandidateData {
    room: string;
    candidate: RTCIceCandidate;
  }
  
//   interface OfferAnswerData {
//     room: string;
//     offer?: RTCSessionDescriptionInit;
//     answer?: RTCSessionDescriptionInit;
//   }


const Contact = () => {

    // setup socket io for audio and video calling;

    const [roomId, setRoomId] = useState<string>('');
    const [inCall, setInCall] = useState<boolean>(false);
    const localVideoRef = useRef<HTMLVideoElement | null>(null);
    const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
    const peerConnection = useRef<RTCPeerConnection | null>(null);
    const socket = useRef<Socket | null>(null);
  
    useEffect(() => {
      socket.current = io('https://level-2-24-assignment-3.vercel.app/api/socket');
  
      socket.current.on('user-connected', async () => {
        console.log('User connected, creating offer...');
        if (peerConnection.current) {
          const offer = await peerConnection.current.createOffer();
          await peerConnection.current.setLocalDescription(offer);
          socket.current?.emit('offer', { room: roomId, offer });
        }
      });
  
      socket.current.on('offer', async (data: RTCSessionDescriptionInit) => {
        if (peerConnection.current) {
          await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data));
          const answer = await peerConnection.current.createAnswer();
          await peerConnection.current.setLocalDescription(answer);
          socket.current?.emit('answer', { room: roomId, answer });
        }
      });
  
      socket.current.on('answer', async (data: RTCSessionDescriptionInit) => {
        if (peerConnection.current) {
          await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data));
        }
      });
  
      socket.current.on('ice-candidate', async (data: RTCIceCandidateInit) => {
        if (data && peerConnection.current) {
          await peerConnection.current.addIceCandidate(new RTCIceCandidate(data));
        }
      });
  
      return () => {
        socket.current?.disconnect();
      };
    }, [roomId]);
  
    const startCall = async () => {
      peerConnection.current = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      });
  
      peerConnection.current.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
        if (event.candidate) {
          socket.current?.emit('ice-candidate', {
            room: roomId,
            candidate: event.candidate,
          } as ICECandidateData);
        }
      };
  
      peerConnection.current.ontrack = (event: RTCTrackEvent) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };
  
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
  
        stream.getTracks().forEach((track) => {
          peerConnection.current?.addTrack(track, stream);
        });
  
        socket.current?.emit('join-room', roomId);
        setInCall(true);
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };






    const options = {
        animationData: contactAnim,
        loop: true
    }

    const {View} = useLottie(options)
    return (
        <div className={`w-full h-auto bg-purple-50 rounded-lg my-6 lg:flex lg:items-center lg:justify-between p-3`}>
        <section className="lg:w-[46%] sm:w-full xsm:w-full h-full bg-blue-50 flex items-center justify-center">
            {/* <img style={{borderRadius:'10px'}} width={450} src={contactus} alt="" /> */}
            {View}
        </section>
        <section className="lg:w-[48%] sm:w-full xsm:w-full h-full">
            <p className="text-gray-700 text-3xl font-bold my-6">Contact Us </p>
            <hr />
            <p className="text-gray-700 my-3">
                Email : roombridge223@gmail.com
            </p>
            <p className="text-gray-700 my-3">
                Phone No: : +801-33452365
            </p>
            <p className="text-gray-700 my-3">
                Office Address : Kolpolok, Road-2, Block-C/Line-3, BridgeCom-Tower, Kalamial Bazar, Chittagong, Bangladesh
            </p>
    
            
            <p  className="text-gray-700 text-3xl font-bold my-6">Contact Form:</p>
            <hr />
            <br />
            <form action="">
                <input style={{background:'none',borderBottom:'1px solid lightgray'}} className='mb-3 w-[400px] ' type="text" name="" id="" placeholder='type your Name' />
                <br />
                <input style={{background:'none',borderBottom:'1px solid lightgray'}} className='mb-3 w-[400px] ' type="email" name="" id="" placeholder='type your email' />
                <br />
                <input style={{background:'none',borderBottom:'1px solid lightgray'}} className='mb-3 w-[400px] ' type="text" name="" id="" placeholder='type subject' />
                <br />
                <textarea style={{background:'none',border:'1px solid lightgray',maxHeight:'100px'}} className='mb-3 w-[400px] p-1 ' id="w3review" name="w3review"/>
                <br />
                <input className='w-[100px] h-[35px] rounded-md bg-purple-600 text-white font-bold cursor-pointer' type="submit" value="SUBMIT" />
            </form>
            <br />
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {!inCall ? (
        <div className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="border rounded p-2 mb-4"
          />
          <button
            onClick={startCall}
            className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
          >
            Join Call
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <video ref={localVideoRef} autoPlay playsInline muted className="w-full rounded shadow-lg" />
          <video ref={remoteVideoRef} autoPlay playsInline className="w-full rounded shadow-lg" />
        </div>
      )}
        </div>
        </section>
        
    </div>
    );
};

export default Contact;