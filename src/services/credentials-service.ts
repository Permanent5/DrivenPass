import { conflictError } from "@/errors";
import credentialRepository from "@/repositories/credentials-repository";
import { Credential } from "@prisma/client";
import bcrypt from "bcrypt"


async function createCredential(credentialData: createCredentialType){
    const verifyUniqueTitle = await credentialRepository.findTitle(credentialData.title, credentialData.userId)
    
    if(verifyUniqueTitle) throw conflictError('title not unique')

    credentialData.password = await bcrypt.hash(credentialData.password, 10)

    const createdCredential = await credentialRepository.createCredential(credentialData)
    return createdCredential
}

async function getUserCredentials(userId: number){
    console.log(userId)
    const findAllCredentialsOfUser = await credentialRepository.findAllCredentialsOfUser(userId)
    let newArr = []
    for(let i = 0; i < findAllCredentialsOfUser.length; i++){

    }
    return findAllCredentialsOfUser
}

async function getAllCredentials(){
    const findAllCredentials = await credentialRepository.getAllCredentials()
    return findAllCredentials
}



const credentialService = {
    createCredential,
    getUserCredentials,
    getAllCredentials
}

export type createCredentialType = Pick<Credential, "title" | "url" | "userId" | "username" | "password">;


export default credentialService