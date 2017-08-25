using System.Collections.Generic;
public class MailItemTemplate {
	public string To { get; set; }
	public string Subject { get;set; }
	public string Template { get; set; }
    public Dictionary<string, string> Values { get; set; }
}