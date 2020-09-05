package cn.gis.service.impl;
import java.sql.SQLException;

import cn.gis.bean.ApplicationForm;
import cn.gis.bean.Tip;
/**
 * 
 * @author Snake
 * 用户服务接口实现类
 */
import cn.gis.bean.User;
import cn.gis.dao.UserDao;
import cn.gis.dao.impl.UserDaoImpl;
import cn.gis.service.UserService;

public class UserSerivceImpl implements UserService {

	//保存用户
	public int saveUser(User user) {
		UserDao dao = new UserDaoImpl();
		boolean isSaveUser =false;
		try {
			//校验用户是否已存在
			
			if(isExit(user.getOpenId())!=0){
				//用户已存在  - 0
				return 0;
			}
			else{
				//用户不存在,保存新用户 
				isSaveUser = dao.saveUser(user);
				if(isSaveUser){
					//保存成功 -- 1
					return 1;
				}
				else{
					//保存失败 -- 2
					return 2;
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return 3;  // 其他情况	 -- 3
	}

	//保存报名表
	public int saveForm(ApplicationForm form) {
		UserDao dao = new UserDaoImpl();
		
		int i =0;
		
		try {
			//校验报名表是否存在
			if(dao.isExit2(form.getUser().getOpenId())!=0){
				//报名表已经存在 -- 0
				return 0;
			}
			else{
				//报名表未存在  
				i =dao.saveForm(form);
				if(i!=0){
					//报名表保存成功 --1
					System.out.println("报名表保存成功!");
					return 1;
				}
				else{
					//报名表保存失败 -- 2
					System.out.println("报名表保存失败");
					return 2;
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		//其他情况 --3
		return 3;
		
	}

	//判断用户是否存在
	public long isExit(String openId) {
		UserDao dao = new UserDaoImpl();
		long exit =0;
		try {
			exit = dao.isExit(openId);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return exit;
	}

	//更新用户信息
	public boolean updateUserInfo(User user) {
		
		UserDao dao = new UserDaoImpl();
		long i = 0;
		try {
			i = dao.updateUserInfo(user);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		if(i!=0){
			//更新成功
			return true;
		}
		else{
			//更新失败
			return false;
		}
	}
	
	//判断报名表是否存在
	public long isExit2(String openId) {
		UserDao dao = new UserDaoImpl();
		long exit2 =0;
		try {
			exit2 = dao.isExit2(openId);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return exit2;
	}

	//保存个性签名
	public int saveSignatureWord(String signatureWord,String openId) {
		UserDao dao = new UserDaoImpl();
		int i =0;
		try {
			i = dao.saveSignatureWord(signatureWord,openId);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		if(i!=0){
			//保存成功 --1
			return i;
		}
		else{
			//保存失败 --0
			return i;
		}
	}

	//获得个性签名
	public String findSignatureWord(String openId) {
		UserDao dao = new UserDaoImpl();
		User user =null;
		String signatureWord = null;
		try {
			user =	dao.findSignatureWord(openId);
			signatureWord = user.getSignatureWord();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return signatureWord;
	}

	//获得报名表
	public ApplicationForm findApplyInfoByOpenId(String openId) {
		UserDao dao = new UserDaoImpl();
		ApplicationForm form =null;
		try {
			form = dao.findApplyInfoByOpenId(openId);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return form;
	}

	//更新报名表
	public int updateApplyInfoByOpenId(ApplicationForm form) {

		UserDao dao = new UserDaoImpl();
		int i =0;
		try {
			//修改成功 -- 1
			i =	dao.updateApplyInfoByOpenId(form);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return i;
	}

	//保存建议
	public int saveTips(Tip tip) {
		UserDao dao = new UserDaoImpl();
		int i =0;
		try {
			//保存成功 -- 1
			i=dao.saveTips(tip);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return i;
	}
	
	
	
}
