package cn.gis.web.servlet;

import java.beans.BeanInfo;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.net.URLDecoder;
import java.util.Base64;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.catalina.tribes.group.interceptors.TwoPhaseCommitInterceptor.MapEntry;
import org.apache.commons.beanutils.BeanUtils;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import cn.gis.bean.ApplicationForm;
import cn.gis.bean.Tip;
import cn.gis.bean.User;
import cn.gis.service.UserService;
import cn.gis.service.impl.UserSerivceImpl;
import cn.gis.utils.Emoji;
import cn.gis.utils.GetOpenIdutil;
import cn.gis.utils.UuidUtil;

public class UserServlet extends BaseServlet {

	// 获得用户的openid
	public void getOpenId(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		String appId = "wx5d3125d28eae4fae";
		String appSecret = "b072a0c331c819532ea6d590034d3451";
		// 获得微信前台的code
		String code = request.getParameter("code");
		// 调用工具类，获得OpenId
		String jsonString = GetOpenIdutil.getopenid(appId, code, appSecret);
		Gson gson = new Gson();
		Map<String, String> retMap = gson.fromJson(jsonString, new TypeToken<Map<String, String>>() {
		}.getType());
		System.out.println(retMap.get("openid"));
		response.getWriter().write(retMap.get("openid"));

	}

	// 保存报名表单信息
	public void setApplyInfo(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		UserService userSerivce = new UserSerivceImpl();
		String openId = request.getParameter("openId");
		Map<String, String[]> applyInfo = request.getParameterMap();

		for (Entry<String, String[]> entry : applyInfo.entrySet()) {
			String[] value = entry.getValue();
			//处理乱码
			value[0] = new String(value[0].getBytes("ISO-8859-1"), "UTF-8");
			//处理表情
			value[0] = Emoji.filterEmoji(value[0]);
			//System.out.println(entry.getKey() + ":" + value[0]);
		}

		// 封装用户信息,报名表信息 -- 利用BeanUtils
		User user = new User();
		ApplicationForm form = new ApplicationForm();
		try {
			// 映射封装
			BeanUtils.populate(user, applyInfo);
			BeanUtils.populate(form, applyInfo);
			// 封装其余项
			user.setIsPay(0);
			form.setaId(UuidUtil.get32UUID());
			form.setUser(user);
			//System.out.println(user.toString());
			//System.out.println(form.toString());

			// 保存用户信息 和报名表信息 需要同步成功，不要数据会不对应
			/*
			 * 用户已存在 -- 0 保存成功 -- 1 保存失败 -- 2  其他情况 -- 3
			 * 
			 * 已填写报名表 --0  报名表保存成功 -- 1 报名表保存失败 --2  其他情况 --3
			 * 
			 */
			int state = userSerivce.saveUser(user);
			int state1 =userSerivce.saveForm(form);
			if (state == 0&&state1==0) {
				response.getWriter().write("0");
			}
			if (state == 1&&state1==1) {
				// 保存报名表信息
				
				response.getWriter().write("1");
			}
			if (state == 2&&state ==2) {
				response.getWriter().write("2");
			}
			if (state == 3&&state ==3) {
				response.getWriter().write("3");
			}

		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		}
	}

	// 更新用户信息
	public void updateUserInfo(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		Map<String, String[]> parameterMap = request.getParameterMap();
		for (Entry<String, String[]> entry : parameterMap.entrySet()) {
			String[] value = entry.getValue();
			value[0] = new String(value[0].getBytes("ISO-8859-1"), "UTF-8");
			//System.out.println(entry.getKey() + ":" + value[0]);
		}
		UserService serivce = new UserSerivceImpl();
		long i =serivce.isExit(parameterMap.get("openId")[0]);
		if(i!=0){
			
			try {
				//用户已存在，报名表已填写 
				//更新用户信息
				User user = new User();
				BeanUtils.populate(user, parameterMap);
				user.setSex(Integer.valueOf(parameterMap.get("gender")[0]));
				boolean isSuccess = serivce.updateUserInfo(user);
				if(isSuccess){
					//更新成功  -- 1
					response.getWriter().write("1");
				}
				else{
					//更新失败 -- 2
					response.getWriter().write("2");
				}
			} catch (IllegalAccessException e) {
			} catch (InvocationTargetException e) {
				e.printStackTrace();
			}
			
		}
		else{
			//用户不存在，报名表未填写  -- 0
			response.getWriter().write("0");
		}
		

	}
	
	//设置个性签名
	public void setSignature(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		UserService service = new UserSerivceImpl();
		String signatureWord = request.getParameter("signatureWord");
		signatureWord = new String(signatureWord.getBytes("ISO-8859-1"), "UTF-8");
		String openId = request.getParameter("openId");
		int i = service.saveSignatureWord(signatureWord,openId);
		if(i!=0){
			//保存成功
			response.getWriter().write("1");
		}
		else{
			//保存失败
			response.getWriter().write("0");
		}
		
	}
	//获取个性签名
	public void getSignature(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		UserService service = new UserSerivceImpl();
		String openId = request.getParameter("openId");
		String signatureWord = service.findSignatureWord(openId);
	
		if(signatureWord!=null){
			response.getWriter().write(signatureWord);
		}
		else{
			//未设置个性签名 --0
			response.getWriter().write("0");
		}
		
		
	}
	//获得报名表单信息
	public void getApplyInfo(HttpServletRequest request, HttpServletResponse response)
				throws ServletException, IOException {
			
		UserService service = new UserSerivceImpl();
		String openId = request.getParameter("openId");
		ApplicationForm form = service.findApplyInfoByOpenId(openId);
		if(form!=null){
			Gson gson = new Gson();
			String json = gson.toJson(form);
			response.getWriter().write(json);
		}
		else{
			//未填写报名表 --0
			response.getWriter().write("0");
		}
		
	}
	
	//获得报名表单信息
	public void updateApplyInfo(HttpServletRequest request, HttpServletResponse response)
				throws ServletException, IOException {
			
			Map<String, String[]> parameterMap = request.getParameterMap();
			for (Entry<String, String[]> entry : parameterMap.entrySet()) {
				String[] value = entry.getValue();
				//处理乱码
				value[0] = new String(value[0].getBytes("ISO-8859-1"), "UTF-8");
				//处理表情
				value[0] = Emoji.filterEmoji(value[0]);
			}
			UserService service = new UserSerivceImpl();
			ApplicationForm form = new ApplicationForm();
			User user = new User();
			user.setOpenId(parameterMap.get("openId")[0]);
			form.setUser(user);
			try {
				BeanUtils.populate(form, parameterMap);
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			} catch (InvocationTargetException e) {
				e.printStackTrace();
			}
			int state =service.updateApplyInfoByOpenId(form);
			if(state!=0){
				//修改成功 -- 1
				response.getWriter().write("1");
			}
			else{
				//修改失败 --0 
				response.getWriter().write("0");
			}
		}
		
	//获得建议
	public void setTip(HttpServletRequest request, HttpServletResponse response)
					throws ServletException, IOException {
		Map<String, String[]> parameterMap = request.getParameterMap();
		for (Entry<String, String[]> entry : parameterMap.entrySet()) {
			String[] value = entry.getValue();
			//处理乱码
			value[0] = new String(value[0].getBytes("ISO-8859-1"), "UTF-8");
			//处理表情
			value[0] = Emoji.filterEmoji(value[0]);
		}
		UserService service = new UserSerivceImpl();
		Tip tip = new Tip();
		try {
			//映射封装
			BeanUtils.populate(tip, parameterMap);
			//手动封装
			tip.settId(UuidUtil.get32UUID());
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		}
		int state = service.saveTips(tip);
		if(state!=0){
			//保存成功  --1
			response.getWriter().write("1");
		}
		else{
			//保存失败  -- 0
			response.getWriter().write("0");
		}
	}
}