import { faker } from '@faker-js/faker';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminProfile } from 'src/admin-profiles/entities/admin-profile.entity';
import { Admin } from 'src/admins/entities/admin.entity';
import { Student } from 'src/students/entities/student.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class SeedDataService {

    private logger = new Logger(SeedDataService.name);
    constructor(
        @InjectRepository(AdminProfile)
        private readonly adminProfileRepository: Repository<AdminProfile>,
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>,
        private readonly datasource: DataSource

    ){}

    async seedData(){
        this.logger.log("Clearing table for initialization...");
        try{
            const queryRunner = this.datasource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();

            try{

                this.logger.log("Clearing table begins..");

                await queryRunner.query('DELETE FROM admin;');
                await queryRunner.query('DELETE FROM admin_profile;');
        
                //ToDO: Add for the other tables

                await queryRunner.commitTransaction();
                this.logger.log("Finished claring tables");

            }catch(err){
                await queryRunner.rollbackTransaction();
                this.logger.error("An error occured creating the tables ", err);
                throw err;
            }finally{
                await queryRunner.release();
            }



        //seed AdminProfile
        for(let i=0; i<10; i++){
            const adminProfile = new AdminProfile();

            adminProfile.first_name = faker.person.firstName();
            adminProfile.last_name = faker.person.lastName();
            adminProfile.address = faker.location.streetAddress();
            adminProfile.phone_number = faker.phone.number();
            adminProfile.profile_picture = faker.system.filePath();
            
            const savedProfile = await this.adminProfileRepository.save(adminProfile);
            
            //seeding admin

            const admin = new Admin();

            admin.username = faker.person.firstName();
            admin.email = faker.internet.email({
                firstName: admin.username,
                provider: "gmail.com"
            });
            admin.password = faker.string.sample({min: 4, max:8});
            admin.last_login = faker.date.past();
            admin.is_superadmin = (i%2===0) ? true:false;
            admin.profile = savedProfile;

            const saveAdmin = await this.adminRepository.save(admin);
        
            const student = new Student();

            student.first_name = faker.person.firstName();
            student.last_name = faker.person.lastName();
            student.phone_number = faker.phone.number();
            student.email = faker.internet.email({
                firstName: student.first_name,
                provider: "gmail.com"
            });
            student.dob = faker.date.birthdate();
            student.address = faker.location.streetAddress();
            student.city = faker.location.city();
            student.country = faker.location.country();
            student.state = faker.location.state();
            student.status = (i%2 === 0) ? 'Active' : 'Inactive';
            student.profile_picture = faker.system.filePath();
            student.gender = faker.person.gender();
        }



        }catch(err){
            this.logger.error("An error occured when creating tables ", err);
        }
    }
}
