import { StatusCodes } from 'http-status-codes'; 
import { settings } from '../../core/settings.js'
export class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository
        this.historyServiceSettings = settings.historyServiceSettings
    }

    async createUser(createUserDto) {
        const transaction = await this.usersRepository.getTransaction()
        
        try {
            const user = await this.usersRepository.create(createUserDto, transaction)
            
            await this.sendDataToHistoryService(user)
            
            await transaction.commit()
            return { userId: user.id }
        } catch (error) {
            await transaction.rollback()
            throw error
        }
    }

    async updateUser(id, updateUserDto) {
        const user = await this.usersRepository.getUserById(id);
        if (!user) {
            return {
                isSuccess: false,
                errorCode: StatusCodes.NOT_FOUND,
                data: null
            } 
        }

        const transaction = await this.usersRepository.getTransaction()
        
        try {
            user.firstname = updateUserDto.firstname ? updateUserDto.firstname : user.firstname
            user.lastname = updateUserDto.lastname ? updateUserDto.lastname : user.lastname
            user.email = updateUserDto.email ? updateUserDto.email : user.email
            
            await this.usersRepository.save(user, transaction)

            await this.sendDataToHistoryService(user)

            await transaction.commit()

            return {
                isSuccess: true,
                errorCode: null,
                data: null
            }
        } catch (error) {
            await transaction.rollback()
            throw error
        }
    }

    async sendDataToHistoryService(user) {
        try {
            const data = JSON.stringify({
                userId: user.id,
                data: {
                    username: user.username,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }
            })

            const response = await fetch(this.historyServiceSettings.URL_USER_HISTORY_SERVICE, {
                method: 'POST',
                headers: new Headers({
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                }),
                mode: 'same-origin',
                body: data
              })
            
            if (response.status !== StatusCodes.CREATED) {
                console.log('error sendDataToHistoryService')
                throw new Error('error sendDataToHistoryService')
            }
        } catch (error) {
            console.log('error sendDataToHistoryService')
            throw error
        }
    }
}
