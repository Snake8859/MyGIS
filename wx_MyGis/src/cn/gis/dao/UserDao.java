package cn.gis.dao;

import java.sql.SQLException;

import cn.gis.bean.ApplicationForm;
import cn.gis.bean.Tip;
import cn.gis.bean.User;

/**
 * 
 * @author Snake
 * 用户dao
 */
public interface UserDao {
	
	
  public boolean saveUser(User user) throws SQLException;  //保存用户

  public long isExit(String openId) throws SQLException; //查看用户是否已存在

  public int saveForm(ApplicationForm form) throws SQLException;   //保存报名表信息

  public long updateUserInfo(User user) throws SQLException;	//更新用户信息

  public long isExit2(String openId) throws SQLException;	  //查看报名表是否存在

  public int saveSignatureWord(String signatureWord,String openId) throws SQLException;	//保存个性签名

  public User findSignatureWord(String openId) throws SQLException;		//获得个性签名

  public ApplicationForm findApplyInfoByOpenId(String openId) throws SQLException;		//获得报名表信息

  public int updateApplyInfoByOpenId(ApplicationForm form) throws SQLException;	//更新用户信息

  public int saveTips(Tip tip) throws SQLException;	 //保存建议
}
