const express = require('express');
const URL = require('../firebaseConfig');
const { doc, addDoc, getDocs, deleteDoc } = require('firebase/firestore')

const addUrl = async (req, res) => {
    const data = req.body;
    const url = await addDoc(URL, data);
    return res.status(200).json({
        success: true,
        message: "URL added successfully"
    })
}


const fetchUrls = async (req, res) => {
    const snapshot = await getDocs(URL);
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.send(list);
}


const deleteUrl = async (req, res) => {
    const id = req.body.id;
    console.log(id);
    console.log(doc(URL, id));
    await deleteDoc(doc(URL, id));
    res.send({
        success: true,
        message: "URL deleted successfully"
    });
}


module.exports = {
    addUrl,
    fetchUrls,
    deleteUrl
}