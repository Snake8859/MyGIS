package cn.gis.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Emoji {
	
	public static String filterEmoji(String context) {
	    //context 获取的内容 
	    if (context == null) {
	        return context;
	    }
	    Pattern emoji = Pattern.compile("[\ud83c\udc00-\ud83c\udfff]|[\ud83d\udc00-\ud83d\udfff]|[\u2600-\u27ff]",
	            Pattern.UNICODE_CASE | Pattern.CASE_INSENSITIVE);
	    Matcher emojiMatcher = emoji.matcher(context);
	    if (emojiMatcher.find()) {
	        //将所获取的表情转换为*
	    	context = emojiMatcher.replaceAll("*");
	        return context;
	    }
	    return context;
	}
}
