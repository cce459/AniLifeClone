import { Link } from "wouter";
import { Play } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary py-12" data-testid="footer">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-cyan to-accent-coral rounded-lg flex items-center justify-center">
                <Play className="text-white h-4 w-4" />
              </div>
              <h4 className="text-xl font-orbitron font-bold gradient-text" data-testid="text-footer-logo">
                애니라이프
              </h4>
            </div>
            <p className="text-muted-foreground text-sm mb-4" data-testid="text-footer-description">
              최고의 애니메이션을 무료로 즐기세요. HD 화질과 한국어 자막으로 완벽한 시청 경험을 제공합니다.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-accent-cyan transition-colors duration-200" data-testid="link-twitter">
                🐦
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-accent-cyan transition-colors duration-200" data-testid="link-facebook">
                📘
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-accent-cyan transition-colors duration-200" data-testid="link-instagram">
                📸
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-accent-cyan transition-colors duration-200" data-testid="link-discord">
                🎮
              </Link>
            </div>
          </div>
          
          <div>
            <h5 className="text-white font-semibold mb-4" data-testid="text-categories-title">카테고리</h5>
            <ul className="space-y-2">
              <li><Link href="/action" className="text-muted-foreground hover:text-accent-cyan transition-colors duration-200 text-sm" data-testid="link-action">액션</Link></li>
              <li><Link href="/romance" className="text-muted-foreground hover:text-accent-cyan transition-colors duration-200 text-sm" data-testid="link-romance">로맨스</Link></li>
              <li><Link href="/comedy" className="text-muted-foreground hover:text-accent-cyan transition-colors duration-200 text-sm" data-testid="link-comedy">코미디</Link></li>
              <li><Link href="/fantasy" className="text-muted-foreground hover:text-accent-cyan transition-colors duration-200 text-sm" data-testid="link-fantasy">판타지</Link></li>
              <li><Link href="/school" className="text-muted-foreground hover:text-accent-cyan transition-colors duration-200 text-sm" data-testid="link-school">학원</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-white font-semibold mb-4" data-testid="text-support-title">고객 지원</h5>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-muted-foreground hover:text-accent-cyan transition-colors duration-200 text-sm" data-testid="link-faq">자주 묻는 질문</Link></li>
              <li><Link href="/support" className="text-muted-foreground hover:text-accent-cyan transition-colors duration-200 text-sm" data-testid="link-support">고객센터</Link></li>
              <li><Link href="/feedback" className="text-muted-foreground hover:text-accent-cyan transition-colors duration-200 text-sm" data-testid="link-feedback">피드백</Link></li>
              <li><Link href="/bugs" className="text-muted-foreground hover:text-accent-cyan transition-colors duration-200 text-sm" data-testid="link-bugs">버그 신고</Link></li>
              <li><Link href="/suggestions" className="text-muted-foreground hover:text-accent-cyan transition-colors duration-200 text-sm" data-testid="link-suggestions">개선 제안</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-white font-semibold mb-4" data-testid="text-info-title">정보</h5>
            <ul className="space-y-2">
              <li><Link href="/terms" className="text-muted-foreground hover:text-accent-cyan transition-colors duration-200 text-sm" data-testid="link-terms">서비스 약관</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-accent-cyan transition-colors duration-200 text-sm" data-testid="link-privacy">개인정보처리방침</Link></li>
              <li><Link href="/copyright" className="text-muted-foreground hover:text-accent-cyan transition-colors duration-200 text-sm" data-testid="link-copyright">저작권 정책</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-accent-cyan transition-colors duration-200 text-sm" data-testid="link-about">회사 소개</Link></li>
              <li><Link href="/careers" className="text-muted-foreground hover:text-accent-cyan transition-colors duration-200 text-sm" data-testid="link-careers">채용 정보</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm" data-testid="text-copyright">
            &copy; 2024 애니라이프. 모든 권리 보유. | 본 사이트는 데모 목적으로 제작되었습니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
