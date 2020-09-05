package cn.gis.utils;

import java.sql.Connection;

import javax.sql.DataSource;

import com.mchange.v2.c3p0.ComboPooledDataSource;

/**
 * C3P0提供核心工具类:ComboPooledDataSource，如果要使用连接池，必须创建该类的实例对象
 * @author Administrator
 *
 */

public class C3P0Utils {
	//使用默认配置
	private static ComboPooledDataSource dataSource =new ComboPooledDataSource();
	//使用命名配置
	//private static ComboPooledDataSource dataSource1 =new ComboPooledDataSource("oracle");
	
	/**
	 * 获得数据源(连接池)
	 */
	public static DataSource getDataSource(){
			return dataSource;
	}
	
	/**
	 * 获得连接
	 */
	public static Connection getConnection(){
		try {
			return dataSource.getConnection();
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
}
