package cn.gis.bean;
/**
 * 
 * @author Snake
 * 报名表类
 */
public class ApplicationForm {

	
	 /*    `aId` varchar(64) NOT NULL COMMENT '会员id',
  `name` varchar(20) NOT NULL COMMENT '会员姓名',
  `studentId` varchar(8) NOT NULL COMMENT '会员学号',
  `college` varchar(64) NOT NULL COMMENT '学院',
  `major` varchar(64) NOT NULL COMMENT '专业',
  `qq` varchar(64) NOT NULL COMMENT 'QQ',
  `email` varchar(64) NOT NULL COMMENT '邮箱',
  `telePhone` varchar(64) NOT NULL COMMENT '手机号码',
  `selfIntroduce` varchar(256) NOT NULL COMMENT '自我介绍',
  `joinPurpose` varchar(256) NOT NULL COMMENT '加入目的',
  `openId` varchar(64) NOT NULL,*/
	
	private String aId;
	private String name;
	private String studentId;
	private String college;
	private String major;
	private String qq;
	private String email;
	private String telePhone;
	private String selfIntroduce;
	private String joinPurpose;
	private User user;
	
	
	public String getaId() {
		return aId;
	}
	public void setaId(String aId) {
		this.aId = aId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getStudentId() {
		return studentId;
	}
	public void setStudentId(String studentId) {
		this.studentId = studentId;
	}
	public String getCollege() {
		return college;
	}
	public void setCollege(String college) {
		this.college = college;
	}
	public String getMajor() {
		return major;
	}
	public void setMajor(String major) {
		this.major = major;
	}
	public String getQq() {
		return qq;
	}
	public void setQq(String qq) {
		this.qq = qq;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getTelePhone() {
		return telePhone;
	}
	public void setTelePhone(String telePhone) {
		this.telePhone = telePhone;
	}
	public String getSelfIntroduce() {
		return selfIntroduce;
	}
	public void setSelfIntroduce(String selfIntroduce) {
		this.selfIntroduce = selfIntroduce;
	}
	public String getJoinPurpose() {
		return joinPurpose;
	}
	public void setJoinPurpose(String joinPurpose) {
		this.joinPurpose = joinPurpose;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	@Override
	public String toString() {
		return "ApplicationForm [aId=" + aId + ", username=" + name + ", college=" + college + ", major=" + major
				+ ", qq=" + qq + ", email=" + email + ", telePhone=" + telePhone + ", selfIntroduce=" + selfIntroduce
				+ ", joinPurpose=" + joinPurpose + ", user=" + user + "]";
	}
	
	
	
	
}
