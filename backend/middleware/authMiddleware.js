import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';


export const protect = asyncHandler(async (req, res, next) => {
    let token
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = req.headers.authorization.split(' ')[1]
  
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
  
        req.user = await User.findById(decoded.id).select('-password')
  
        next()
      } catch (error) {
        console.error(error)
        res.status(401)
        throw new Error('Not authorized, token failed')
      }
    }
  
    if (!token) {
      res.status(401)
      throw new Error('Not authorized, no token')
    }
  })

export const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next()
    } else {
      res.status(401)
      throw new Error('Not authorized as an admin')
    }
  }
  
  export const commitmentAdmin = (req, res, next) => {
    if (req.user ) {
      if(req.user.isAdmin || req.user.isCommitmentAdmin){
        next()
      }else{
      res.status(401)
      throw new Error('Not authorized as Admin')
      }
      
    } else {
      res.status(401)
      throw new Error('Not authorized')
    }
  }  
  
  export const cal = (req, res, next) => {
    if (req.user && req.user.isCal) {
      next()
    } else {
      res.status(401)
      throw new Error('Not authorized as an calligrapher')
    }
  } 
  
  export const reader = (req, res, next) => {
    if (req.user && req.user.isReader) {
      next()
    } else {
      res.status(401)
      throw new Error('Not authorized as an reader')
    }
  }   

  export const trainerAdmin = (req, res, next) => {
    if (req.user ) {
      if(req.user.isAdmin || req.user.isTrainer){
        next()
      }else{
      res.status(401)
      throw new Error('Not authorized as Admin')
      }
      
    } else {
      res.status(401)
      throw new Error('Not authorized')
    }
  }  
  
  export const academicAdmin = (req, res, next) => {
    if (req.user ) {
      if(req.user.isAdmin || req.user.isAcademic){
        next()
      }else{
      res.status(401)
      throw new Error('Not authorized as Admin')
      }
      
    } else {
      res.status(401)
      throw new Error('Not authorized')
    }
  }  
  export const counselAdmin = (req, res, next) => {
    if (req.user ) {
      if(req.user.isAdmin || req.user.isCounselor){
        next()
      }else{
      res.status(401)
      throw new Error('Not authorized as Admin')
      }
      
    } else {
      res.status(401)
      throw new Error('Not authorized')
    }
  }  
  export const techAdmin = (req, res, next) => {
    if (req.user ) {
      if(req.user.isAdmin || req.user.isTechAdmin){
        next()
      }else{
      res.status(401)
      throw new Error('Not authorized as Admin')
      }
      
    } else {
      res.status(401)
      throw new Error('Not authorized')
    }
  }  