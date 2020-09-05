package cn.gis.dao.impl;
import java.sql.SQLException;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;
import org.eclipse.jdt.internal.compiler.ast.QualifiedNameReference;

import cn.gis.bean.ApplicationForm;
import cn.gis.bean.Tip;
import cn.gis.bean.User;
/**
 * 用户dao接口实现类
 */
import cn.gis.dao.UserDao;
import cn.gis.utils.C3P0Utils;

public class UserDaoImpl implements UserDao {

	//保存用户
	public boolean saveUser(User user) throws SQLException {
		QueryRunner runner = new QueryRunner(C3P0Utils.getDataSource());
		String sql = "insert into t_user values(?,?,?,?,?,?,?)";
		int update = runner.update(sql, user.getOpenId(),null,null,null,null,user.getIsPay(),null);
		if(update!=0){
			return true;
		}
		else{
			return false;
		}
		
	}

	//查看用户是否已存在
	public long isExit(String openId) throws SQLException {
		QueryRunner runner = new QueryRunner(C3P0Utils.getDataSource());
		String sql = "select count(*) from t_user where openid=?";
		long query = (Long) runner.query(sql, new ScalarHandler(), openId);
		return query;
	}

	//保存报名表信息
	public int saveForm(ApplicationForm form) throws SQLException {
		QueryRunner runner = new QueryRunner(C3P0Utils.getDataSource());
		String sql = "insert into t_apply values(?,?,?,?,?,?,?,?,?,?,?)";
		int update = runner.update(sql, form.getaId(),form.getName(),form.getStudentId(),form.getCollege(),form.getMajor(),form.getQq(),form.getEmail(),
				form.getTelePhone(),form.getSelfIntroduce(),form.getJoinPurpose(),form.getUser().getOpenId());
		return update;
	}

	//保存用户信息
	public long updateUserInfo(User user) throws SQLException {
		QueryRunner runner = new QueryRunner(C3P0Utils.getDataSource());
		String sql = "update t_user set nickName= ?,sex=?,province=?,city=? where openId=?";
		long i = runner.update(sql, user.getNickName(),user.getSex(),user.getProvince(),user.getCity(),user.getOpenId());
		return i;
	}

	//查看报名是否已经存在
	public long isExit2(String openId) throws SQLException {
		QueryRunner runner = new QueryRunner(C3P0Utils.getDataSource());
		String sql = "select count(*) from t_apply where openid=?";
		long query = (Long) runner.query(sql, new ScalarHandler(), openId);
		return query;
	}

	//保存个性签名
	public int saveSignatureWord(String signatureWord,String openId) throws SQLException {
		QueryRunner runner = new QueryRunner(C3P0Utils.getDataSource());
		String sql = "update t_user set signatureWord=? where openId =?";
		int update = runner.update(sql, signatureWord,openId);
		return update;
	}

	//获得个性签名
	public User findSignatureWord(String openId) throws SQLException {
		QueryRunner runner = new QueryRunner(C3P0Utils.getDataSource());
		String sql ="select  * from t_user where openId =?";
		User query = runner.query(sql, new BeanHandler<User>(User.class), openId);
		return query;
	}

	//查询报名表
	public ApplicationForm findApplyInfoByOpenId(String openId) throws SQLException {
		QueryRunner runner = new QueryRunner(C3P0Utils.getDataSource());
		String sql ="select  * from t_apply where openId =?";
		ApplicationForm query = runner.query(sql, new BeanHandler<ApplicationForm>(ApplicationForm.class), openId);
		return query;
	}

	//更新报名表
	public int updateApplyInfoByOpenId(ApplicationForm form) throws SQLException {
		QueryRunner runner = new QueryRunner(C3P0Utils.getDataSource());
		/*	`name` varchar(20) NOT NULL COMMENT '会员名称',
		  `studentId` varchar(8) NOT NULL COMMENT '会员学号',
		  `college` varchar(64) NOT NULL COMMENT '学院',
		  `major` varchar(64) NOT NULL COMMENT '专业',
		  `qq` varchar(64) NOT NULL COMMENT 'QQ',
		  `email` varchar(64) NOT NULL COMMENT '邮箱',
		  `telePhone` varchar(64) NOT NULL COMMENT '手机号码',
		  `selfIntroduce` varchar(512) NOT NULL COMMENT '自我介绍',
		  `joinPurpose` varchar(521) NOT NULL COMMENT '加入目的',*/
		String sql ="update t_apply set name = ?,studentId = ?, college = ?,major = ?,qq = ?,"
				+ "email = ?,telePhone = ?,selfIntroduce = ?,joinPurpose = ? where openId = ?";
		int update = runner.update(sql, form.getName(),form.getStudentId(),form.getCollege(),form.getMajor(),form.getQq(),form.getEmail(),
				form.getTelePhone(),form.getSelfIntroduce(),form.getJoinPurpose(),form.getUser().getOpenId());
		return update;
	}

	//保存建议
	public int saveTips(Tip tip) throws SQLException {
		QueryRunner runner = new QueryRunner(C3P0Utils.getDataSource());
		String sql = "insert into t_tips values(?,?,?,?)";
		int update = runner.update(sql, tip.gettId(),tip.getTipWords(),tip.getTelePhone(),tip.getOpenId());
		return update;
	}

}
