import { faker } from '@faker-js/faker';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfile } from 'src/user-profiles/entities/user-profile.entity';
import { Admin } from 'src/admins/entities/admin.entity';
import { Student } from 'src/students/entities/student.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import { Report } from 'src/reports/entities/report.entity';
import { Feedback } from 'src/feedbacks/entities/feedback.entity';
import { AdminLog } from 'src/admin-logs/entities/admin-log.entity';
import { PasswordChange } from 'src/password-changes/entities/password-change.entity';
import { CourseInrollment } from 'src/course_inrollments/entities/course_inrollment.entity';
import { AuditLog } from 'src/audit_logs/entities/audit_log.entity';
import { DataSource, Repository } from 'typeorm';
import * as Bcrypt from 'bcrypt';

@Injectable()
export class SeedDataService {
  private logger = new Logger(SeedDataService.name);
  constructor(
    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
    @InjectRepository(AdminLog)
    private readonly adminLogRepository: Repository<AdminLog>,
    @InjectRepository(PasswordChange)
    private readonly passwordChangeRepository: Repository<PasswordChange>,
    @InjectRepository(CourseInrollment)
    private readonly courseInrollmentRepository: Repository<CourseInrollment>,
    @InjectRepository(AuditLog)
    private readonly auditLogRepository: Repository<AuditLog>,
    private readonly datasource: DataSource,
  ) {}

  async seedData() {
    this.logger.log('Clearing table for initialization...');
    try {
      const queryRunner = this.datasource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        this.logger.log('Clearing table begins..');
        await queryRunner.query('DELETE FROM admin;');
        await queryRunner.query('DELETE FROM admin_profile;');
        await queryRunner.query('DELETE FROM subject;');
        await queryRunner.query('DELETE FROM feedback;');
        await queryRunner.query('DELETE FROM admin_log;');
        await queryRunner.query('DELETE FROM password_change;');
        await queryRunner.query('DELETE FROM course_inrollment;');
        await queryRunner.query('DELETE FROM course;');
        await queryRunner.query('DELETE FROM student;');
        await queryRunner.query('DELETE FROM report;');
        await queryRunner.query('DELETE FROM audit_log;');
        await queryRunner.commitTransaction();
        this.logger.log('Finished clearing tables');
      } catch (err) {
        await queryRunner.rollbackTransaction();
        this.logger.error('An error occurred clearing the tables ', err);
        throw err;
      } finally {
        await queryRunner.release();
      }

      this.logger.log('Starting to insert data...');
      for (let i = 0; i < 10; i++) {
        // Profiles
        const adminProfile = new UserProfile();
        adminProfile.first_name = faker.person.firstName();
        adminProfile.last_name = faker.person.lastName();
        adminProfile.address = faker.location.streetAddress();
        adminProfile.phone_number = faker.phone.number();
        adminProfile.profile_picture = faker.system.filePath();
        const savedAdminProfile =
          await this.userProfileRepository.save(adminProfile);

        const studentProfile = new UserProfile();
        studentProfile.first_name = faker.person.firstName();
        studentProfile.last_name = faker.person.lastName();
        studentProfile.address = faker.location.streetAddress();
        studentProfile.phone_number = faker.phone.number();
        studentProfile.profile_picture = faker.system.filePath();
        const savedStudentProfile =
          await this.userProfileRepository.save(studentProfile);

        // Admin
        const admin = new Admin();
        admin.username = faker.person.firstName();
        admin.email = faker.internet.email({
          firstName: admin.username,
          provider: 'gmail.com',
        });
        const plainPass = faker.string.sample({ min: 4, max: 8 });
        console.log(plainPass);
        admin.password = await Bcrypt.hash(plainPass, 10);
        admin.last_login = faker.date.past();
        admin.is_superadmin = i % 2 === 0;
        admin.profile = savedAdminProfile;
        const savedAdmin = await this.adminRepository.save(admin);

        // Student
        const student = new Student();
        student.first_name = faker.person.firstName();
        student.last_name = faker.person.lastName();
        student.phone_number = faker.phone.number();
        student.email = faker.internet.email({
          firstName: student.first_name,
          provider: 'gmail.com',
        });
        student.dob = faker.date.birthdate();
        student.address = faker.location.streetAddress();
        student.city = faker.location.city();
        student.country = faker.location.country();
        student.state = faker.location.state();
        student.status = i % 2 === 0 ? 'Active' : 'Inactive';
        student.profile_picture = faker.system.filePath();
        student.gender = faker.person.gender();
        student.enrollment_date = faker.date.past();
        student.profile = savedStudentProfile;
        const savedStudent = await this.studentRepository.save(student);

        // Course
        const course = new Course();
        course.course_name = faker.word.words(2);
        course.credits = faker.number.int({ min: 1, max: 5 });
        course.description = faker.lorem.sentence();
        course.status = i % 2 === 0 ? 'Active' : 'Inactive';
        course.created_at = faker.date.past();
        course.updated_at = faker.date.recent();
        const savedCourse = await this.courseRepository.save(course);

        // Subject
        const subject = new Subject();
        subject.subject_name = faker.word.words(2);
        subject.credits = faker.number.int({ min: 1, max: 5 });
        subject.course = savedCourse;
        subject.created_at = faker.date.past();
        subject.updated_at = faker.date.recent();
        const savedSubject = await this.subjectRepository.save(subject);

        // Report
        const report = new Report();
        report.student = savedStudent;
        report.course = savedCourse;
        report.report_data = faker.lorem.paragraph();
        report.report_date = faker.date.recent();
        await this.reportRepository.save(report);

        // Feedback
        const feedback = new Feedback();
        feedback.user_id = savedStudent.student_id;
        feedback.subject = savedSubject;
        feedback.feedback = faker.lorem.sentence();
        feedback.rating = faker.number.int({ min: 1, max: 5 });
        feedback.timestamp = faker.date.recent();
        await this.feedbackRepository.save(feedback);

        // AdminLog
        const adminLog = new AdminLog();
        adminLog.login_time = faker.date.past();
        adminLog.logout_time = faker.date.recent();
        adminLog.admin = savedAdmin;
        await this.adminLogRepository.save(adminLog);

        // PasswordChange
        const passwordChange = new PasswordChange();
        passwordChange.admin_id = savedAdmin;
        passwordChange.old_password = faker.internet.password();
        passwordChange.new_password = faker.internet.password();
        await this.passwordChangeRepository.save(passwordChange);

        // CourseInrollment
        const courseInrollment = new CourseInrollment();
        courseInrollment.student_id = savedStudent;
        courseInrollment.course = savedCourse;
        courseInrollment.enroll_date = faker.date.past();
        courseInrollment.status = i % 2 === 0 ? 'Active' : 'Inactive';
        await this.courseInrollmentRepository.save(courseInrollment);

        // AuditLog
        const auditLog = new AuditLog();
        auditLog.user_id = savedAdmin.admin_id;
        auditLog.action = faker.lorem.words(3);
        auditLog.timestamp = faker.date.recent();
        auditLog.entity_affected = 'Admin';
        auditLog.ip_address = faker.internet.ip();
        await this.auditLogRepository.save(auditLog);
      }

      this.logger.log('Finished inserting data..');
    } catch (err) {
      this.logger.error('An error occurred when creating tables ', err);
    }
  }
}
