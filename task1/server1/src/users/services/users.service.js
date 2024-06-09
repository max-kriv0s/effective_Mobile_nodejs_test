
export class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository
    }

    async createUser(createUserDto) {
        const transaction = await this.usersRepository.getTransaction()
        
        try {
            const user = await this.usersRepository.create(createUserDto, transaction)
            await transaction.commit()
            return { userId: user.id }
        } catch (error) {
            await transaction.rollback()
            throw error
        }
    }

    async updateUser(id, updateUserDto) {
        const transaction = await this.usersRepository.getTransaction()
        
        try {
            await this.usersRepository.update(id, updateUserDto, transaction)
            await transaction.commit()
        } catch (error) {
            await transaction.rollback()
            throw error
        }
    }
}
