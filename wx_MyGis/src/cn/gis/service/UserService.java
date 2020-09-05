package cn.gis.service;
import cn.gis.bean.ApplicationForm;
import cn.gis.bean.Tip;
/**
 * 
 * @author Snake
 * 用户接口服务
 */
import cn.gis.bean.User;

public interface UserService {

	public int saveUser(User user);  //保存用户

	public long isExit(String openId); //判断用户是否存在
	
	public int saveForm(ApplicationForm form); //保存报名表

	public boolean updateUserInfo(User user);  //更新用户信息
	
	public long isExit2(String openId);  //判断报名表是否存在

	public int saveSignatureWord(String signatureWord,String openId); //保存个性签名

	public String findSignatureWord(String openId); //获得个性签名

	public ApplicationForm findApplyInfoByOpenId(String openId); //获得报名表

	public int updateApplyInfoByOpenId(ApplicationForm form);  //更新报名表信息

	public int saveTips(Tip tip);  //保存建议
	
}
