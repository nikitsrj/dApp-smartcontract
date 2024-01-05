import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import HelloWorldContract from './contracts/HelloWorld.json';
import './App.css';
function App() {
    const [contract, setContract] = useState(null);
    const [message, setMessage] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadBlockchainData = async () => {
            try {
                const web3 = new Web3(window.ethereum);
                const networkId = await web3.eth.net.getId();
                const deployedNetwork = HelloWorldContract.networks[networkId];
                const instance = new web3.eth.Contract(
                    HelloWorldContract.abi,
                    deployedNetwork && deployedNetwork.address
                );
                setContract(instance);
            } catch (error) {
                console.error(error);
            }
        };

        loadBlockchainData();
    }, []);

    const getMessage = async () => {
        if (contract) {
            try {
                setLoading(true);
                const message = await contract.methods.message().call();
                setMessage(message);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    };

    const updateMessage = async () => {
        if (contract && newMessage !== '') {
            try {
                setLoading(true);
                await contract.methods.updateMessage(newMessage).send({ from: (await window.ethereum.enable())[0] });
                setNewMessage('');
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="App">
            <h1 className="header">dApp on BlockChain</h1>
            <div className="content">
                <div className="message">
                    <h2>Current Message</h2>
                    <p className="messageValue">{loading ? 'Loading...' : message}</p>
                    <button onClick={getMessage}>Refresh</button>
                </div>                
            </div>
            <div className="content">
                <div className="update">
                    <h2>Update Message</h2>
                    <input
                        type="text"
                        placeholder="New Message"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="inputMessage"
                    />
                    <br/>
                    <button onClick={updateMessage}>Update</button>
                </div>
            </div>
        </div>
    );
}

export default App;